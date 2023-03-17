const form = document.querySelector('form')
const block = document.querySelector('.result-block')
const input = document.querySelector('input')

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    while(block.firstChild) { 
        block.removeChild(block.firstChild)
    }

    let search = `${form.search.value}`

    // length valid
    if (search.length < 2) {
        block.insertAdjacentHTML('afterbegin', `
        <p style="color: white;">Недостаточно символов ( минимальное количество - 2 )</p>`)
        return
    }
    
    // response
    const response = await fetch(`https://api.github.com/search/repositories?q=${search}`)
    let content = await response.json()

    // if not found
    if (content.items.length < 1) {
        block.insertAdjacentHTML('afterbegin', `
        <p style="color: white;" class="notFound-message">Ничего не найдено</p>`)
        return
    }

    // render
    content.items.slice(0,10).map(e => {
        block.insertAdjacentHTML('afterbegin', `
        <div class="result-item">
        <div class="author-info">
            <img width="80px" height="80px" src="${e.owner.avatar_url}" alt="avatar">
            <p>${e.owner.login}</p>
        </div>
        <div class="repos-info">
            <a title="Кликните, чтобы перейти на страницу репозитория" href="${e.html_url}" target="_blank">${e.name}</a>
            <p>visibility: ${e.visibility}</p>
            <p class="date">created at ${e.created_at.split('T')[0]}</p>
            <p>last update ${e.updated_at.split('T')[0]}</p>
        </div>
        </div>
        `)
    })
})