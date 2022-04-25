const button = document.querySelector("button");
const inputField = document.querySelector("#search");
const url = "https://api.github.com/users/";
const noResult = document.querySelector(".error");
const toggleSwitch = document.querySelector(".theme__container");

// get user

const getUser = async (input) => {
  noResult.style.display = "none";
  const endPoint = `${url}${input}`;
  const response = await fetch(endPoint);
  const jsonResponse = await response.json();
  if (response.ok) {
    // get name
    const name = document.querySelector(".name");
    if (jsonResponse.name === "" || jsonResponse.name === null) {
      name.innerText = jsonResponse.login.replace(/\@/g, "");
    } else {
      name.innerText = jsonResponse.name;
    }

    // get username
    const username = (document.querySelector(
      ".username"
    ).innerText = `@${jsonResponse.login}`);

    // get date joined
    const dateJoined = document.querySelector(".joined");
    const date = new Date(jsonResponse.created_at);
    const dtFormat = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    const newDate = dtFormat.format(date);
    dateJoined.innerText = `Joined ${newDate}`;

    // get image icon
    const icon = (document.querySelector("#icon").src =
      jsonResponse.avatar_url);

    // get bio
    const bio = document.querySelector(".bio");
    if (jsonResponse.bio === "" || jsonResponse.bio === null) {
      bio.innerText = "This profile has no bio";
      bio.style.opacity = "0.5";
    } else {
      bio.innerText = jsonResponse.bio;
      bio.style.opacity = null;
    }

    // get stats
    const repos = (document.querySelector(".repos").innerText =
      jsonResponse.public_repos);
    const followers = (document.querySelector(".followers").innerText =
      jsonResponse.followers);
    const following = (document.querySelector(".following").innerText =
      jsonResponse.following);

    // get info
    const location = document.querySelector(".location");
    if (jsonResponse.location === "" || jsonResponse.location === null) {
      renderNotAvailable(location);
    } else {
      location.innerText = jsonResponse.location;
      defaultStyles(location);
    }
    const website = document.querySelector(".website");
    if (jsonResponse.blog === "" || jsonResponse.blog === null) {
      renderNotAvailable(website);
    } else {
      website.innerText = jsonResponse.blog;
      website.href = jsonResponse.blog;
      defaultStyles(website);
    }
    const twitter = document.querySelector(".twitter");
    if (
      jsonResponse.twitter_username === "" ||
      jsonResponse.twitter_username === null
    ) {
      renderNotAvailable(twitter);
    } else {
      twitter.innerText = jsonResponse.twitter_username;
      twitter.href = `https://twitter.com/${jsonResponse.twitter_username}`;
      defaultStyles(twitter);
    }
    const company = document.querySelector(".company");
    if (jsonResponse.company === null || !jsonResponse.company.includes("@")) {
      renderNotAvailable(company);
    } else {
      company.innerText = jsonResponse.company;
      let gitPage = jsonResponse.company.replace(/\@/g, "");
      company.href = `https://github.com/${gitPage}`;
      defaultStyles(company);
    }
  } else {
    noResult.style.display = "block";
  }
};

getUser("octocat");

// get user when search button is clicked

button.addEventListener("click", () => {
  const newInput = inputField.value;
  if (!newInput == "") {
    return getUser(newInput);
  }
});

toggleSwitch.addEventListener("click", () => {
  const body = document.querySelector("body");
  //   if dark mode preferred
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    body.classList.remove("dark__mode");
    body.classList.toggle("light__mode");
    // if light mode preferred
  } else if (window.matchMedia("(prefers-color-scheme:light)").matches) {
    body.classList.remove("light__mode");
    body.classList.toggle("dark__mode");
  } else {
    // toggle dark mode if there is no color scheme preference
    body.classList.toggle("dark__mode");
  }
});

function renderNotAvailable(element) {
  element.innerText = "Not Available";
  element.style.opacity = "0.5";
  element.style.pointerEvents = "none";
}

function defaultStyles(element) {
  element.style.opacity = null;
  element.style.pointerEvents = null;
}
