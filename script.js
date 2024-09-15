document.addEventListener("DOMContentLoaded", function () {
    const postList = document.getElementById("post-list");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const tagFilter = document.getElementById("tag-filter");
    const sortSelect = document.getElementById("sort-select");
    const backButton = document.getElementById("back-button");

    if (!postList || !searchInput || !categoryFilter || !tagFilter || !sortSelect || !backButton) {
        console.error("必要な要素がHTMLに存在しません。");
        return;
    }

    function renderPosts(postsToRender) {
        postList.innerHTML = '';
        if (postsToRender.length === 0) {
            const noPosts = document.createElement("p");
            noPosts.textContent = "投稿が見つかりませんでした。";
            postList.appendChild(noPosts);
            return;
        }
        postsToRender.forEach(post => {
            const postItem = document.createElement("div");
            postItem.classList.add("post-item");
            postItem.innerHTML = `
                <h3>${highlightText(post.title)}</h3>
                <p>${highlightText(post.subtitle)}</p>
                <p>${post.date}</p>
                <p>タグ: ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}</p>
            `;
            postItem.addEventListener("click", function () {
                window.location.hash = `#post-${post.id}`; // クリック時にアンカーを設定
            });
            postList.appendChild(postItem);
        });
    }

    function showPostDetail(post) {
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-subtitle").textContent = post.subtitle;
        document.getElementById("post-date").textContent = post.date;
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-tags").innerHTML = `タグ: ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(', ')}`;
        document.getElementById("post-detail").classList.add('active');
    }

    function showTabFromHash() {
        const hash = window.location.hash;
        if (hash.startsWith("#post-")) {
            const postId = parseInt(hash.replace("#post-", ""), 10);
            const post = posts.find(p => p.id === postId);
            if (post) {
                showPostDetail(post);
                return;
            }
        } else {
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            const activeTab = document.querySelector(hash);
            if (activeTab) {
                activeTab.classList.add('active');
            }
        }
    }

    function handleBackButtonClick() {
        window.history.back(); // ブラウザの「戻る」ボタンの動作を模倣
    }

    searchInput.addEventListener("input", filterPosts);
    categoryFilter.addEventListener("change", filterPosts);
    tagFilter.addEventListener("change", filterPosts);
    sortSelect.addEventListener("change", filterPosts);
    backButton.addEventListener("click", handleBackButtonClick);

    window.addEventListener('hashchange', showTabFromHash); // ハッシュ変更時に投稿を表示

    // 初回ページ読み込み時にもハッシュを確認
    showTabFromHash();
    renderPosts(posts);
});
