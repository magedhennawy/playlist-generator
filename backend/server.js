import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import request from "request";
import cookieParser from "cookie-parser";
const app = express();
import { spotify } from "./spotify.js";
import { generatePlaylist } from "./gpt.js";
import dotenv from "dotenv";
import queryString from "query-string";
import generateRandomString from "./spotifyAuth.js";

var redirect_uri = "http://localhost:3000/callback";
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;

var stateKey = "spotify_auth_state";

dotenv.config();

app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:5173", "https://playlistai.onrender.com"],
    })
);
app.use(cookieParser());

app.get("/search", async (req, res) => {
    res.json(await spotify(req.query.q, req.query.limit));
});

app.get("/login", function (req, res) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    var scope = "user-read-private user-read-email";

    res.redirect(
        "https://accounts.spotify.com/authorize?" +
            queryString.stringify({
                response_type: "code",
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state,
            })
    );
});

app.get("/callback", function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect(
            "/#" +
                querystring.stringify({
                    error: "state_mismatch",
                })
        );
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: "authorization_code",
            },
            headers: {
                Authorization:
                    "Basic " +
                    new Buffer.from(client_id + ":" + client_secret).toString(
                        "base64"
                    ),
            },
            json: true,
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token;
                var refresh_token = body.refresh_token;

                var options = {
                    url: "https://api.spotify.com/v1/me",
                    headers: { Authorization: "Bearer " + access_token },
                    json: true,
                };

                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                res.redirect(
                    "/#" +
                        queryString.stringify({
                            access_token: access_token,
                            refresh_token: refresh_token,
                        })
                );
            } else {
                res.redirect(
                    "/#" +
                        queryString.stringify({
                            error: "invalid_token",
                        })
                );
            }
        });
    } // end else statement
});

app.get("/refresh_token", function (req, res) {
    var refresh_token = req.query.refresh_token;
    console.log(refresh_token);
    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        headers: {
            Authorization:
                "Basic " +
                new Buffer.from(client_id + ":" + client_secret).toString(
                    "base64"
                ),
        },
        form: {
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                access_token: access_token,
            });
        }
    });
});

app.post("/gpt", async (req, res) => {
    res.json(await generatePlaylist(req.body));
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
