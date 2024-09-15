document.addEventListener("DOMContentLoaded", function () {
    // DOMのロードが完了した後に実行されるコード

    const postList = document.getElementById("post-list");
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const tagFilter = document.getElementById("tag-filter");
    const sortSelect = document.getElementById("sort-select");
    const backButton = document.getElementById("back-button");

    // 検索、カテゴリ、タグ、ソートで投稿をフィルタリングする関数
    function filterPosts() {
        const searchText = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const selectedTag = tagFilter.value;
        const selectedSort = sortSelect.value;

        let filteredPosts = posts;

        // 検索フィルタリング
        if (searchText) {
            filteredPosts = filteredPosts.filter(post =>
                post.title.toLowerCase().includes(searchText) ||
                post.subtitle.toLowerCase().includes(searchText)
            );
        }

        // カテゴリフィルタリング
        if (selectedCategory) {
            filteredPosts = filteredPosts.filter(post => post.category === selectedCategory);
        }

        // タグフィルタリング
        if (selectedTag) {
            filteredPosts = filteredPosts.filter(post => post.tags.includes(selectedTag));
        }

        // 並び替え
        if (selectedSort === 'date-asc') {
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (selectedSort === 'date-desc') {
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        renderPosts(filteredPosts);
    }

    function renderPosts(postsToRender) {
        postList.innerHTML = '';
        postsToRender.forEach(post => {
            const postItem = document.createElement("div");
            postItem.classList.add("post-item");
            postItem.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.subtitle}</p>
                <p>${post.date}</p>
                <p>タグ: ${post.tags.join(", ")}</p>
            `;
            postList.appendChild(postItem);
        });
    }

    searchInput.addEventListener("input", filterPosts);
    categoryFilter.addEventListener("change", filterPosts);
    tagFilter.addEventListener("change", filterPosts);
    sortSelect.addEventListener("change", filterPosts);
});
