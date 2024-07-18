const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const methodOverride = require("method-override");

const { v4: uuidv4 } = require('uuid');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () =>
{
    console.log("Listening to port : ",port);
});

let posts = [
    {
        id: uuidv4(),
        username : "Rakesh",
        content : "I love coding!"
    },
    {
        id: uuidv4(),
        username: "Meet",
        content : "To acheive something great, harwork is required."
    },
    {
        id: uuidv4(),
        username: "John",
        content : "Harwork, consistent, patience is the key for the success."
    }
];

app.get("/posts", (req, res) =>
{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) =>
{
    res.render("new.ejs", {posts});
}); 

app.post("/posts", (req, res) =>
{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) =>
{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    
    if(post)
    {
        res.render("show.ejs", {post});
    }
    else
    {
        res.status(404).send(`Post with id ${id} not found.`);    
    }
});

app.patch("/posts/:id", (req, res) =>
{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) =>
{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    let old_content = post.content;
    let newContent = req.body.content;
    post.content = newContent;
    console.log(post);
    res.render("edit.ejs", { post, old_content });
});

app.delete("/posts/:id", (req, res) =>
{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});




