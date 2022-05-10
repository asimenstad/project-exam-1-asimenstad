const commentForm = document.querySelector("#post-comment-form");
const commentsContainer = document.querySelector(".comments-container");
const commentAmount = document.querySelector(".comment-amount");
const commentUrl = "https://annais.cool/projects/project-exam-api/wp-json/wp/v2/comments";
const specificCommentsUrl = `${commentUrl}?post=${id}`;

function addComment(e) {
  e.preventDefault();

  const [commentId, commentName, commentEmail, comment] = e.target.elements;

  commentId.value = id;

  const data = JSON.stringify({
    post: commentId.value,
    author_name: commentName.value,
    author_email: commentEmail.value,
    content: comment.value,
  });

  fetch(commentUrl, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      if (response.ok === true) {
      }
      commentForm.reset();
      return response.json();
    })
    .then((object) => {})
    .catch((error) => console.log("Error:", error));
}

commentForm.addEventListener("submit", addComment);

async function fetchComments() {
  try {
    const response = await fetch(specificCommentsUrl);
    const comments = await response.json();
    displayComments(comments);
  } catch (error) {
    console.log("Error:", error);
  }
}
fetchComments();

function displayComments(comments) {
  commentAmount.innerHTML = `(${comments.length})`;
  for (let i = 0; i < comments.length; i++) {
    commentsContainer.innerHTML += `<div class="comment-specific"><h3><span class="comment-author">${comments[i].author_name}</span> says</h3><p class="comment-date">${comments[i].date}</p>${comments[i].content.rendered}</div><hr>`;
  }
}
