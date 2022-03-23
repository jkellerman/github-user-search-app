const url = "https://api.github.com/users/octocat";

const getUser = async () => {
  const response = await fetch(url);
  const jsonResponse = await response.json();
  if (response.ok) {
    console.log(jsonResponse);

    // get name
    let name = document.querySelector(".name");
    if (jsonResponse.name === "" || jsonResponse.name === null) {
      name.innerText = jsonResponse.login.replace(/\@/g, "");
    } else {
      name.innerText = jsonResponse.name;
    }

    // get username
    let username = (document.querySelector(
      ".username"
    ).innerText = `@${jsonResponse.login}`);

    // get date joined
    let dateJoined = document.querySelector(".joined");
    let date = new Date(jsonResponse.created_at);
    let dtFormat = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    let newDate = dtFormat.format(date);
    dateJoined.innerText = `Joined ${newDate}`;

    // get image icon
    let icon = (document.querySelector("#icon").src = jsonResponse.avatar_url);

    // get bio
    let bio = document.querySelector(".bio");
    if (jsonResponse.bio === "" || jsonResponse.bio === null) {
      bio.innerText = "This profile has no bio";
      bio.style.opacity = "0.5";
    } else {
      bio.innerText = jsonResponse.bio;
    }

    // get stats
    let repos = (document.querySelector(".repos").innerText =
      jsonResponse.public_repos);
    let followers = (document.querySelector(".followers").innerText =
      jsonResponse.followers);
    let following = (document.querySelector(".following").innerText =
      jsonResponse.following);

    // get info
    let location = document.querySelector(".location");
    if (jsonResponse.location === "" || jsonResponse.location === null) {
      renderNotAvailable(location);
    } else {
      location.innerText = jsonResponse.location;
    }
    let website = document.querySelector(".website");
    if (jsonResponse.blog === "" || jsonResponse.blog === null) {
      renderNotAvailable(website);
    } else {
      website.innerText = jsonResponse.blog;
      website.href = jsonResponse.blog;
    }
    let twitter = document.querySelector(".twitter");
    if (
      jsonResponse.twitter_username === "" ||
      jsonResponse.twitter_username === null
    ) {
      renderNotAvailable(twitter);
    } else {
      twitter.innerText = jsonResponse.twitter_username;
      twitter.href = `https://twitter.com/${jsonResponse.twitter_username}`;
    }
    let company = document.querySelector(".company");
    if (jsonResponse.company === null || !jsonResponse.company.includes("@")) {
      renderNotAvailable(company);
    } else {
      company.innerText = jsonResponse.company;
      let gitPage = jsonResponse.company.replace(/\@/g, "");
      company.href = `https://github.com/${gitPage}`;
    }
  }
};

getUser();

function renderNotAvailable(element) {
  element.innerText = "Not Available";
  element.style.opacity = "0.5";
  element.style.pointerEvents = "none";
}
