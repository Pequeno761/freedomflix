const API_KEY = '832a40f6d7edf386b7ad6810de3570c9';
let currentTmdbId, currentType, currentServer = 'vidsrc', s_val = 1, e_val = 1;
let currentPage = 1, currentMode = 'trending', currentGenreId = null, currentYear = null;
let maratonaItems = [], currentMaratonaIdx = 0, currentMaratonaPage = 1;

const COLLECTIONS = {
    marvel: { title: "Marvel: Saga do Infinito", ids: [1726, 1724, 10138, 10195, 1771, 24428, 68721, 70160, 76338, 118340, 99861, 102899, 271110, 284052, 284053, 315635, 283995, 284054, 299536, 363088, 299537], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" },
    harrypotter: { title: "Harry Potter", ids: [671, 672, 673, 674, 675, 767, 12444, 12445], logo: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Harry_Potter_wordmark.svg" },
    starwars: { title: "Star Wars", ids: [1893, 1894, 1895, 11, 1891, 1892, 140607, 181808, 181812], logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" },
    fast: { title: "Velozes e Furiosos", ids: [9799, 584, 9615, 13804, 82992, 168259, 281566, 337339, 385128, 385687], logo: "https://upload.wikimedia.org/wikipedia/commons/0/03/Fast_and-furious-logo.svg" },
    shrek: { title: "Saga Shrek", ids: [808, 809, 810, 10192, 8696, 315162], logo: "https://upload.wikimedia.org/wikipedia/en/3/39/Shrek_logo.svg" },
    panda: { title: "Kung Fu Panda", ids: [9502, 49444, 140300, 1011985], logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/Kung_Fu_Panda_logo.svg" },
    wick: { title: "John Wick", ids: [245891, 324552, 458156, 603692], logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/John_Wick_Keanu_Reeves.png" },
    batman_nolan: { title: "Batman: Trilogia Nolan", ids: [272, 155, 49026], logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Batman_logo.svg" },
    hungergames: { title: "Jogos Vorazes", ids: [70160, 101299, 131631, 131634, 605172], logo: "https://upload.wikimedia.org/wikipedia/en/d/dc/The_Hunger_Games_logo.png" },
    lotr: { title: "O Senhor dos Anéis", ids: [120, 121, 122], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Lord_of_the_Rings_logo.svg" },
    toystory: { title: "Toy Story", ids: [862, 863, 10193, 301528], logo: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Toy_Story_logo.svg" },
    jurassic: { title: "Jurassic Park", ids: [329, 330, 331, 135397, 351286, 507086], logo: "https://upload.wikimedia.org/wikipedia/commons/e/e4/Jurassic_Park_logo.svg" },
    mission: { title: "Missão Impossível", ids: [954, 955, 956, 38356, 353494, 353081, 575264], logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Mission_Impossible_Logo.png" },
    spiderman: { title: "Homem-Aranha", ids: [557, 558, 559, 1930, 102382, 315635, 429617, 634649], logo: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Spider-Man_2002_logo.svg" },
    matrix: { title: "Matrix", ids: [603, 604, 605, 624860], logo: "https://upload.wikimedia.org/wikipedia/commons/c/c1/The_Matrix_Logo.svg" },
    pirates: { title: "Piratas do Caribe", ids: [22, 58, 59, 1865, 166426], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Pirates_of_the_Caribbean_logo.svg" },
    transformers: { title: "Transformers", ids: [1858, 21208, 38356, 185333, 91314, 335988, 667538], logo: "https://upload.wikimedia.org/wikipedia/commons/2/25/Transformers_logo.svg" },
    iceage: { title: "A Era do Gelo", ids: [425, 953, 5994, 57800, 277834], logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Ice_Age_Logo.svg" },
    indiana: { title: "Indiana Jones", ids: [85, 87, 89, 217, 335977], logo: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Indiana_Jones_logo.svg" },
    madagascar: { title: "Madagascar", ids: [953, 10527, 80321], logo: "https://upload.wikimedia.org/wikipedia/en/3/36/Madagascar_Theatrical_Poster.jpg" },
    dc_snyder: { title: "Universo DC (Snyder)", ids: [209112, 209112, 297762, 297761, 38700, 49521, 9738, 9739], logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg" },
    jamesbond: { title: "James Bond 007", ids: [646, 657, 658, 660, 667, 668, 680, 298, 365222, 370172], logo: "https://upload.wikimedia.org/wikipedia/commons/c/c4/007_logo.svg" },
    mcu_fase4: { title: "Marvel: Fase 4", ids: [497698, 524434, 497582, 616037, 532308, 505642, 438631], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg" },
    residentevil: { title: "Resident Evil", ids: [157, 158, 159, 160, 161, 162], logo: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Resident_Evil_Logo.png" },
    alien: { title: "Alien Saga", ids: [103, 104, 105, 106, 8077, 126889, 447332], logo: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Alien_Logo.png" },
    terminator: { title: "O Exterminador do Futuro", ids: [218, 280, 296, 10391, 87101, 290859], logo: "https://upload.wikimedia.org/wikipedia/commons/a/af/Terminator_logo.png" },
    rocky: { title: "Rocky Balboa", ids: [1366, 1367, 1368, 1369, 1370, 1371, 302156, 384737, 480414], logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Rocky_Logo.png" },
    planetoftheapes: { title: "Planeta dos Macacos", ids: [11224, 861, 119450, 281338, 653346], logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Planet_of_the_Apes_logo.png" },
    meninblack: { title: "MIB: Homens de Preto", ids: [607, 608, 41154, 438650], logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Men_in_Black_logo.svg" },
    despicableme: { title: "Meu Malvado Favorito", ids: [20352, 93456, 268896, 324857, 286217, 324857], logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Despicable_Me_logo.png" },
    cars: { title: "Carros (Disney/Pixar)", ids: [920, 49013, 260514], logo: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Cars_logo.svg" },
    monstersinc: { title: "Monstros S.A.", ids: [585, 62211], logo: "https://upload.wikimedia.org/wikipedia/commons/6/63/Monsters%2C_Inc._logo.svg" },
    theincredibles: { title: "Os Incríveis", ids: [9806, 260513], logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/The_Incredibles_logo.svg" },
    findingnemo: { title: "Procurando Nemo", ids: [12, 127380], logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/Finding_Nemo_logo.svg" },
    howtotrainyourdragon: { title: "Como Treinar o Seu Dragão", ids: [10191, 49017, 166428], logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/How_to_Train_Your_Dragon_Logo.png" },
    kungfupanda: { title: "Kung Fu Panda", ids: [9502, 49444, 140300, 1011985], logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/Kung_Fu_Panda_logo.svg" },
    piratesofthecaribbean: { title: "Piratas do Caribe", ids: [22, 58, 59, 1865, 166426], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Pirates_of_the_Caribbean_logo.svg" },
    backtothefuture: { title: "De Volta para o Futuro", ids: [105, 165, 196], logo: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Back_to_the_Future_logo.png" },
    thelordoftherings: { title: "O Senhor dos Anéis", ids: [120, 121, 122], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Lord_of_the_Rings_logo.svg" },
    thehobbit: { title: "O Hobbit", ids: [49051, 49047, 49040], logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/The_Hobbit_logo.png" },
    johwick: { title: "John Wick", ids: [245891, 324552, 458156, 603692], logo: "https://upload.wikimedia.org/wikipedia/en/9/9f/John_Wick_Keanu_Reeves.png" },
    diehard: { title: "Duro de Matar", ids: [562, 1573, 1572, 4705, 47964], logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Die_Hard_logo.png" },
    lethalweapon: { title: "Máquina Mortífera", ids: [941, 942, 943, 944], logo: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Lethal_Weapon_logo.png" },
    oceanseleven: { title: "Onze Homens e um Segredo", ids: [161, 162, 163, 353081], logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Ocean%27s_Eleven_logo.png" },
    thehangover: { title: "Se Beber, Não Case!", ids: [18785, 44833, 109439], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/The_Hangover_logo.png" },
    twilight: { title: "Crepúsculo", ids: [1735, 13223, 24021, 42434, 50620], logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Twilight_logo.svg" },
    fifty_shades: { title: "Cinquenta Tons de Cinza", ids: [216015, 341174, 337167], logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Fifty_Shades_logo.png" },
    divergent: { title: "Divergente", ids: [157336, 262500, 262504], logo: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Divergent_logo.png" },
    mazerunner: { title: "Maze Runner", ids: [198663, 294254, 336843], logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Maze_Runner_logo.png" },
    narnia: { title: "As Crônicas de Nárnia", ids: [411, 2454, 36557], logo: "https://upload.wikimedia.org/wikipedia/commons/5/52/Narnia_logo.png" },
    percyjackson: { title: "Percy Jackson", ids: [32697, 76285], logo: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Percy_Jackson_logo.png" },
    dragonball_z: { title: "Dragon Ball Z (Filmes)", ids: [34433, 30588, 39107, 39100, 39106, 39101, 39105, 39104, 301328, 126963], logo: "https://upload.wikimedia.org/wikipedia/commons/2/22/Dragon_Ball_Z_logo.svg" },
    naruto_shippuden: { title: "Naruto Shippuden (Filmes)", ids: [22212, 16859, 36802, 45314, 110416, 122210, 317442], logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Naruto_logo.svg" },
    one_piece: { title: "One Piece (Filmes)", ids: [459488, 375315, 230266, 122362, 127533, 82690, 82436, 13723, 10428, 10323], logo: "https://upload.wikimedia.org/wikipedia/commons/b/b3/One_Piece_logo.svg" },
    saint_seiya: { title: "Cavaleiros do Zodíaco (Filmes)", ids: [33355, 33356, 33357, 33358, 230267, 1021464], logo: "https://upload.wikimedia.org/wikipedia/commons/3/30/Saint_Seiya_logo.png" }
};

window.onload = () => loadContent('trending');

function closeWelcomeModal() {
    const modal = document.getElementById('welcome-modal');
    const content = document.getElementById('welcome-content');
    content.classList.add('modal-fade-out');
    setTimeout(() => {
        modal.style.opacity = '0';
        modal.style.transition = '0.5s';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 500);
    }, 300);
}

function renderMovieCard(item, type) {
    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date || '';
    const year = date ? new Date(date).getFullYear() : 'N/A';
    const overview = item.overview || 'Sinopse não disponível para este título.';
    const poster = item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://via.placeholder.com/500x750/111/fff?text=Sem+Poster';
    
    // Escapar aspas simples para evitar erro no onclick
    const escapedOverview = overview.replace(/'/g, "\\'").replace(/\n/g, " ");
    const escapedTitle = title.replace(/'/g, "\\'");

    return `
        <div class="movie-card" onclick="showDetails(${item.id}, '${type}')">
            <img src="${poster}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <p>${overview}</p>
                <div class="card-date">${year}</div>
                <button class="btn-card-synopsis" onclick="event.stopPropagation(); showSynopsis('${escapedTitle}', '${escapedOverview}')">
                    <i class="fas fa-info-circle"></i> Sinopse
                </button>
            </div>
            <div class="card-title-external">${title}</div>
        </div>`;
}

function toggleSynopsis(synopsisId, btn) {
    const el = document.getElementById(synopsisId);
    el.classList.toggle('expanded');
    btn.innerText = el.classList.contains('expanded') ? 'Ler menos' : 'Ler mais';
}

function checkSynopsisOverflow(id, btnId) {
    const el = document.getElementById(id);
    const btn = document.getElementById(btnId);
    if (!el || !btn) return;
    
    // Reset state
    el.classList.remove('expanded');
    btn.innerText = 'Ler mais';
    
    // Pequeno delay para garantir que o texto foi renderizado
    setTimeout(() => {
        if (el.scrollHeight > el.clientHeight + 5) {
            btn.style.display = 'block';
        } else {
            btn.style.display = 'none';
        }
    }, 100);
}

let currentCollection = null;
let currentCollectionIdx = 0;

async function openMaratona(collectionKey) {
    currentCollection = COLLECTIONS[collectionKey];
    currentCollectionIdx = 0;
    loadMaratonaItem();
}

async function navMaratona(dir) {
    if (!currentCollection) return;
    currentCollectionIdx += dir;
    
    if (currentCollectionIdx < 0) currentCollectionIdx = currentCollection.ids.length - 1;
    if (currentCollectionIdx >= currentCollection.ids.length) currentCollectionIdx = 0;
    
    loadMaratonaItem();
}

function loadMaratonaItem() {
    const id = currentCollection.ids[currentCollectionIdx];
    const navContainer = document.getElementById('maratona-nav-btns');
    if (navContainer) {
        navContainer.classList.remove('hidden');
        navContainer.style.display = 'flex';
    }
    
    // Abrir o modal padrão de detalhes com o ID do filme da coleção
    showDetails(id, 'movie', true);
}

/* --- LÓGICA DETALHES ELEGANTES --- */
async function showDetails(id, type, isMaratona = false) {
    document.body.style.overflow = 'hidden';
    const modal = document.getElementById('details-modal');
    modal.style.display = 'flex';
    
    // Controlar visibilidade dos botões de navegação de maratona
    const navContainer = document.getElementById('maratona-nav-btns');
    if (navContainer) {
        if (isMaratona) {
            navContainer.classList.remove('hidden');
            navContainer.style.display = 'flex';
        } else {
            navContainer.classList.add('hidden');
            navContainer.style.display = 'none';
        }
    }

    // Reset Tabs to Synopsis
    const synopsisTabBtn = document.querySelector('#details-modal .tab-btn:first-child');
    if (synopsisTabBtn) switchTab(synopsisTabBtn, 'details-synopsis-tab');
    
    // Reset e loading
    document.getElementById('details-title').innerText = 'Carregando...';
    document.getElementById('details-synopsis').innerText = '';
    document.getElementById('details-meta').innerHTML = '';
    document.getElementById('details-backdrop').style.backgroundImage = 'none';
    document.getElementById('details-trailer-container').innerHTML = '';
    document.getElementById('details-related-container').classList.remove('show');
    document.getElementById('details-episodes-container').classList.remove('show');
    document.getElementById('details-seasons-btn').classList.add('hidden');
    document.getElementById('details-read-more').style.display = 'none';
    
    try {
        const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos,recommendations`);
        const data = await res.json();
        
        const title = data.title || data.name;
        const year = (data.release_date || data.first_air_date || '').split('-')[0];
        const rating = data.vote_average ? data.vote_average.toFixed(1) : 'N/A';
        const duration = data.runtime ? `${data.runtime} min` : data.number_of_seasons ? `${data.number_of_seasons} Temporadas` : '';
        
        // Carregar Miniatura
        const poster = data.poster_path ? `https://image.tmdb.org/t/p/w200${data.poster_path}` : 'https://via.placeholder.com/200x300/111/fff?text=FF';
        const detailsThumb = document.getElementById('details-thumb');
        if (detailsThumb) detailsThumb.src = poster;
        
        // Se estiver em modo maratona, podemos prefixar o título com o contador
        const displayTitle = isMaratona ? `[${currentCollectionIdx + 1}/${currentCollection.ids.length}] ${title}` : title;
        document.getElementById('details-title').innerText = displayTitle;
        
        document.getElementById('details-synopsis').innerText = data.overview || 'Sinopse não disponível.';
        document.getElementById('details-meta').innerHTML = `<span>${year}</span><span>⭐ ${rating}</span><span>${duration}</span>`;
        document.getElementById('details-backdrop').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${data.backdrop_path})`;
        
        // Verificar se precisa de "Ler mais"
        checkSynopsisOverflow('details-synopsis', 'details-read-more');
        
        // Buscar Trailer
        const trailer = data.videos.results.find(v => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube');
        if (trailer) {
            const origin = window.location.origin;
            document.getElementById('details-trailer-container').innerHTML = `
                <iframe src="https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&controls=1&loop=1&playlist=${trailer.key}&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1&origin=${origin}" 
                        allow="autoplay; encrypted-media" 
                        sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-presentation"
                        title="Trailer"></iframe>`;
        }
        
        // Configurar Botão Assistir
        document.getElementById('details-watch-btn').onclick = () => {
            closeDetails();
            openPlayer(id, type);
        };

        // Se for série, preparar temporadas
        if (data.number_of_seasons && data.seasons && data.seasons.length > 0) {
            currentTmdbId = id; 
            const select = document.getElementById('details-season-select');
            select.innerHTML = '';
            let hasValidSeasons = false;
            
            data.seasons.forEach(s => {
                if (s.season_number === 0 || (!s.air_date && s.episode_count === 0)) return; 
                const opt = document.createElement('option');
                opt.value = s.season_number;
                opt.innerText = `Temporada ${s.season_number}`;
                select.appendChild(opt);
                hasValidSeasons = true;
            });
            
            if (hasValidSeasons) {
                document.getElementById('details-seasons-btn').classList.remove('hidden');
                loadDetailsEpisodes(select.value);
            } else {
                document.getElementById('details-seasons-btn').classList.add('hidden');
            }
        } else {
            document.getElementById('details-seasons-btn').classList.add('hidden');
            document.getElementById('details-episodes-container').classList.remove('show');
        }
        
        // Carregar Recomendações
        renderRecommendations(data.recommendations.results, type);
        
    } catch (e) {
        console.error("Erro detalhes:", e);
    }
}

async function loadDetailsEpisodes(seasonNum) {
    try {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${currentTmdbId}/season/${seasonNum}?api_key=${API_KEY}&language=pt-BR`);
        const data = await res.json();
        const grid = document.getElementById('details-ep-grid');
        grid.innerHTML = '';
        
        data.episodes.forEach(ep => {
            const item = document.createElement('div');
            item.className = 'details-ep-item';
            const img = ep.still_path ? `https://image.tmdb.org/t/p/w300${ep.still_path}` : 'https://via.placeholder.com/300x169/111/fff?text=Episódio';
            item.innerHTML = `
                <img src="${img}">
                <div class="details-ep-info"><b>${ep.episode_number}. ${ep.name}</b></div>
            `;
            item.onclick = () => {
                closeDetails();
                s_val = seasonNum;
                e_val = ep.episode_number;
                openPlayer(currentTmdbId, 'tv');
            };
            grid.appendChild(item);
        });
    } catch (e) { console.error("Erro episódios detalhes:", e); }
}

function toggleDetailsEpisodes() {
    const container = document.getElementById('details-episodes-container');
    container.classList.toggle('show');
    if (container.classList.contains('show')) {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function renderRecommendations(list, type) {
    const grid = document.getElementById('details-related-grid');
    if (!list || list.length === 0) {
        document.getElementById('details-related-container').classList.remove('show');
        return;
    }
    
    // Usando a mesma função de renderização da home para manter o padrão
    grid.innerHTML = list.slice(0, 15).map(item => renderMovieCard(item, type)).join('');
    
    // Mostrar automaticamente
    document.getElementById('details-related-container').classList.add('show');
    
    // Ajustar os cards para o tamanho da seção de detalhes
    grid.querySelectorAll('.movie-card').forEach(card => {
        card.classList.add('related-item');
    });
}

function scrollRelated(direction, gridId = 'details-related-grid') {
    const grid = document.getElementById(gridId);
    const scrollAmount = grid.clientWidth * 0.7;
    grid.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
}

function toggleDetailsInfo(minimize, bodyId = 'details-body') {
    const body = document.getElementById(bodyId);
    if (minimize) body.classList.add('minimized');
    else body.classList.remove('minimized');
}

function closeDetails() {
    document.getElementById('details-modal').style.display = 'none';
    document.getElementById('details-trailer-container').innerHTML = '';
    document.getElementById('details-body').classList.remove('minimized');
    document.body.style.overflow = 'auto';
}

function scrollGenres(direction) {
    const container = document.getElementById('genresList');
    const scrollAmount = 300 * direction;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

async function loadContent(mode, btn = null) {
    if(btn) { document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active')); btn.classList.add('active'); }
    if (mode === 'canais') { 
        openTVModal(); 
        return; 
    }

    if (mode === 'futebol') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        document.getElementById('yearSelect').parentElement.style.display = 'none';
        document.getElementById('genresWrapper').style.display = 'none';
        document.getElementById('catalog-container').innerHTML = '';
        loadFootballSection();
        return;
    }

    document.getElementById('yearSelect').parentElement.style.display = 'block';
    document.getElementById('genresWrapper').style.display = 'flex';
    currentMode = mode;
    currentPage = 1;
    currentGenreId = null;
    currentYear = null;
    document.getElementById('yearSelect').value = "";        
    loadGenres(mode === 'movie' || mode === 'trending' ? 'movie' : 'tv');
    loadYears();
    const container = document.getElementById('sections-container');
    container.innerHTML = '<p style="text-align:center; padding:50px;">Carregando vitrine...</p>';
    const sections = [
        { title: 'Recém Adicionados', params: '&sort_by=primary_release_date.desc&vote_count.gte=50' },
        { title: 'Lançamentos 2026', params: '&primary_release_year=2026&sort_by=popularity.desc' },
        { title: 'Recomendados para Você', params: '&sort_by=vote_average.desc&vote_count.gte=1000' },
        { title: 'Populares e Outros', params: '&sort_by=popularity.desc' }
    ];
    let html = '';
    const type = (mode === 'movie') ? 'movie' : (mode === 'tv') ? 'tv' : 'movie';
    currentType = type;
    for (const section of sections) {
        let sectionParams = section.params;
        const res = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=pt-BR${sectionParams}&page=1`);
        const data = await res.json();
        if (data.results && data.results.length > 0) {
            html += `
                <div class="content-section">
                    <div class="section-header"><span>${section.title}</span><div class="btn-see-all" onclick="showAllFromSection('${section.title}', '${type}', '${sectionParams}')">Ver tudo</div></div>
                    <div class="row-wrapper">
                        <button class="nav-arrow left" onclick="scrollRow(this, -1)"><i class="fas fa-chevron-left"></i></button>
                        <div class="row-container">
                            ${data.results.map(item => renderMovieCard(item, type)).join('')}
                        </div>
                        <button class="nav-arrow right" onclick="scrollRow(this, 1)"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>`;
        }
    }
    container.innerHTML = html;
    loadFullCatalog(type, 1);
}

async function loadMaratonaHub(page = 1) {
    currentMaratonaPage = page;
    const container = document.getElementById('sections-container');
    container.innerHTML = `<h2 style="font-family:'Bebas Neue'; font-size:3rem; margin-top:20px; color:var(--primary); text-align:center;">Escolha uma Franquia para Maratonar</h2><div class="collection-hub"></div><div id="maratona-pagination" class="pagination"></div>`;
    const hub = container.querySelector('.collection-hub');
    
    const keys = Object.keys(COLLECTIONS);
    const perPage = 8;
    const start = (page - 1) * perPage;
    const paginatedKeys = keys.slice(start, start + perPage);

    for (const key of paginatedKeys) {
        const c = COLLECTIONS[key];
        try {
            const firstMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${c.ids[0]}?api_key=${API_KEY}`);
            const firstMovie = await firstMovieRes.json();
            
            const card = document.createElement('div');
            card.className = 'collection-card';
            card.onclick = () => openMaratona(key);
            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w1280${firstMovie.backdrop_path}">
                <img src="${c.logo}" class="brand-logo" alt="${c.title}">
                <div class="collection-name">${c.title}</div>
            `;
            hub.appendChild(card);
        } catch(e) { console.error("Erro hub:", e); }
    }
    renderPagination('maratona-pagination', keys.length, perPage, page, loadMaratonaHub);
}

function renderPagination(id, totalItems, perPage, currentPage, callback) {
    const totalPages = Math.ceil(totalItems / perPage);
    const div = document.getElementById(id);
    if (!div) return;
    div.innerHTML = `
        <button class="btn-page" onclick="${callback.name}(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-arrow-left"></i> Anterior</button>
        <div id="page-info">Página ${currentPage} de ${totalPages}</div>
        <button class="btn-page" onclick="${callback.name}(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Próxima <i class="fas fa-arrow-right"></i></button>
    `;
}

async function loadFullCatalog(type, page) {
    const catalogContainer = document.getElementById('catalog-container');
    catalogContainer.innerHTML = '<p style="text-align:center; padding:50px;">Carregando conteúdo...</p>';
    
    let params = `&api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}`;
    if (currentGenreId) params += `&with_genres=${currentGenreId}`;
    if (currentYear) {
        if (type === 'movie') params += `&primary_release_year=${currentYear}`;
        else params += `&first_air_date_year=${currentYear}`;
    }

    const res = await fetch(`https://api.themoviedb.org/3/discover/${type}?${params}`);
    const data = await res.json();
    
    let title = `Catálogo Completo`;
    if (currentGenreId && currentYear) title = `Resultados: Gênero e Ano (${currentYear})`;
    else if (currentGenreId) title = `Resultados: Gênero Selecionado`;
    else if (currentYear) title = `Resultados: Ano ${currentYear}`;
    
    catalogContainer.innerHTML = `
        <div class="content-section">
            <div class="section-header"><span>${title}</span></div>
            <div class="row-container" style="flex-wrap: wrap; justify-content: center; overflow: visible;">
                ${data.results.map(item => renderMovieCard(item, type)).join('')}
            </div>
            <div class="pagination">
                <button class="btn-page" onclick="changePage(-1)" ${page === 1 ? 'disabled' : ''}><i class="fas fa-arrow-left"></i> Anterior</button>
                <div id="page-info">Página ${page} de ${data.total_pages > 500 ? 500 : data.total_pages}</div>
                <button class="btn-page" onclick="changePage(1)">Próxima <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>`;
}

function changePage(step) {
    currentPage += step;
    if (currentPage < 1) currentPage = 1;
    loadFullCatalog(currentType, currentPage);
    document.getElementById('catalog-container').scrollIntoView({ behavior: 'smooth' });
}

function loadYears() {
    const select = document.getElementById('yearSelect');
    select.innerHTML = `<option value="">Ano de Lançamento (Todos)</option>`;
    for (let y = 2026; y >= 1950; y--) {
        const opt = document.createElement('option');
        opt.value = y; opt.innerText = y;
        select.appendChild(opt);
    }
}

function filterByYear(year) {
    currentYear = year || null;
    currentPage = 1;
    document.getElementById('sections-container').innerHTML = ''; 
    loadFullCatalog(currentType, 1);
}

async function loadGenres(type) {
    const res = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    const container = document.getElementById('genresList');
    container.innerHTML = `<div class="genre-pill active" onclick="filterByGenre(null, this)">Todos os Gêneros</div>`;
    data.genres.forEach(genre => {
        const pill = document.createElement('div');
        pill.className = 'genre-pill'; pill.innerText = genre.name;
        pill.onclick = () => filterByGenre(genre.id, pill);
        container.appendChild(pill);
    });
}

async function filterByGenre(genreId, pill) {
    document.querySelectorAll('#genresList .genre-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentGenreId = genreId;
    currentPage = 1;
    document.getElementById('sections-container').innerHTML = ''; 
    loadFullCatalog(currentType, 1);
}

async function searchContent() {
    const query = document.getElementById('searchInput').value;
    const typeSelect = document.getElementById('searchType').value;
    if (!query) return;
    document.getElementById('catalog-container').innerHTML = '';
    const container = document.getElementById('sections-container');
    container.innerHTML = '<p style="text-align:center; padding:50px;">Buscando...</p>';
    const res = await fetch(`https://api.themoviedb.org/3/search/${typeSelect === 'multi' ? 'multi' : typeSelect}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`);
    const data = await res.json();
    container.innerHTML = `
        <div class="content-section">
            <div class="section-header"><span>Resultados para: ${query}</span></div>
            <div class="row-container" style="flex-wrap: wrap; justify-content: center; overflow: visible;">
                ${data.results.filter(i => i.poster_path && i.media_type !== 'person').map(item => renderMovieCard(item, item.media_type || (item.title ? 'movie' : 'tv'))).join('')}
            </div>
        </div>`;
}

function openPlayer(id, type) {
    currentTmdbId = id; currentType = type; s_val = 1; e_val = 1;
    document.getElementById('serverSelector').classList.remove('hidden');
    if (type === 'tv') { document.getElementById('tvFields').classList.remove('hidden'); loadSeasons(id); }
    else { document.getElementById('tvFields').classList.add('hidden'); }
    document.getElementById('player-section').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    updateIframe();
}

function updateIframe() {
    const player = document.getElementById('mainPlayer');
    let url = '';
    if (currentServer === 'vidsrc') url = currentType === 'movie' ? `https://vidsrc.to/embed/movie/${currentTmdbId}` : `https://vidsrc.to/embed/tv/${currentTmdbId}/${s_val}/${e_val}`;
    else if (currentServer === 'superembed') url = currentType === 'movie' ? `https://multiembed.mov/directstream.php?video_id=${currentTmdbId}&tmdb=1` : `https://multiembed.mov/directstream.php?video_id=${currentTmdbId}&tmdb=1&s=${s_val}&e=${e_val}`;
    else url = currentType === 'movie' ? `https://myembed.biz/filme/${currentTmdbId}` : `https://myembed.biz/serie/${currentTmdbId}/${s_val}/${e_val}`;
    player.src = url;

    // COMUNICAÇÃO COM A EXTENSÃO
    const event = new CustomEvent('FF_PlayerLoaded', { 
        detail: { url: url, server: currentServer, id: currentTmdbId } 
    });
    window.dispatchEvent(event);
}

function changeServer(server, btn) {
    document.querySelectorAll('.server-selector .genre-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active'); currentServer = server; updateIframe();
}

function closePlayer() {
    document.getElementById('player-section').style.display = 'none';
    document.getElementById('mainPlayer').src = '';
    document.body.style.overflow = 'auto';
    document.getElementById('episodes-browser').style.display = 'none';
}

async function loadSeasons(id) {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    const select = document.getElementById('seasonSelect');
    select.innerHTML = '';
    data.seasons.forEach(s => { if(s.season_number === 0) return; const opt = document.createElement('option'); opt.value = s.season_number; opt.innerText = `Temporada ${s.season_number}`; select.appendChild(opt); });
    loadEpisodes(1);
}

async function loadEpisodes(seasonNum) {
    const res = await fetch(`https://api.themoviedb.org/3/tv/${currentTmdbId}/season/${seasonNum}?api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    const grid = document.getElementById('episodesGrid');
    grid.innerHTML = '';
    data.episodes.forEach(ep => {
        const item = document.createElement('div'); item.className = 'ep-item';
        const img = ep.still_path ? `https://image.tmdb.org/t/p/w300${ep.still_path}` : 'https://via.placeholder.com/300x169/111/fff';
        item.innerHTML = `<img src="${img}"><div class="ep-info"><b>${ep.episode_number}. ${ep.name}</b></div>`;
        item.onclick = () => { s_val = seasonNum; e_val = ep.episode_number; updateIframe(); toggleEpisodesBrowser(); };
        grid.appendChild(item);
    });
}

function toggleEpisodesBrowser() { const b = document.getElementById('episodes-browser'); b.style.display = b.style.display === 'block' ? 'none' : 'block'; }
function scrollRow(btn, direction) { const row = btn.parentElement.querySelector('.row-container'); const scrollAmount = row.clientWidth * 0.8; row.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' }); }

async function showAllFromSection(title, type, params) {
    const container = document.getElementById('sections-container');
    container.innerHTML = '<p style="text-align:center; padding:50px;">Carregando tudo...</p>';
    let allResults = [];
    for(let p=1; p<=2; p++) {
        const res = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=pt-BR${params}&page=${p}`);
        const data = await res.json();
        allResults = allResults.concat(data.results);
    }
    container.innerHTML = `
        <div class="content-section">
            <div class="section-header"><span>${title}</span></div>
            <div class="row-container" style="flex-wrap: wrap; justify-content: center; overflow: visible;">
                ${allResults.map(item => renderMovieCard(item, type)).join('')}
            </div>
        </div>`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

let allChannels = [], currentFilteredChannels = [], currentChannelIdx = 0;
async function openTVModal() {
    document.body.style.overflow = 'hidden';
    const modal = document.getElementById('tv-modal');
    modal.style.display = 'flex';
    
    if (allChannels.length === 0) {
        try {
            const [resCat, resChan] = await Promise.all([
                fetch('https://reidosembeds.com/api/channels/categories'),
                fetch('https://reidosembeds.com/api/channels')
            ]);
            const [dataCat, dataChan] = await Promise.all([resCat.json(), resChan.json()]);
            
            // Filtrar Categoria Adulto
            const categories = dataCat.data.filter(c => c.name.toLowerCase() !== 'adulto');
            const adultCatIds = dataCat.data.filter(c => c.name.toLowerCase() === 'adulto').map(c => c.id);
            
            allChannels = dataChan.data.filter(chan => !adultCatIds.includes(chan.category_id));
            currentFilteredChannels = allChannels;
            
            // Renderizar Categorias
            const catContainer = document.getElementById('tv-categories');
            catContainer.innerHTML = `<div class="genre-pill active" onclick="filterTVByCategory(null, this)">Todos</div>`;
            categories.forEach(cat => {
                const pill = document.createElement('div'); pill.className = 'genre-pill'; pill.innerText = cat.name;
                pill.onclick = () => filterTVByCategory(cat.id, pill); catContainer.appendChild(pill);
            });
            
            renderTVGrid(allChannels);
            if (allChannels.length > 0) playChannel(allChannels[0].embed_url, allChannels[0].name, allChannels[0].logo_url);
        } catch(e) { console.error("Erro ao carregar TV:", e); }
    }
}

function renderTVGrid(channels) {
    const grid = document.getElementById('tv-grid');
    grid.innerHTML = channels.map((chan, idx) => `
        <div class="tv-list-item" onclick="playChannel('${chan.embed_url}', '${chan.name.replace(/'/g, "\\'")}', '${chan.logo_url}')">
            <img src="${chan.logo_url}" alt="">
            <span>${chan.name}</span>
        </div>`).join('');
}

function toggleTVCategories() {
    const el = document.getElementById('tv-cat-wrapper');
    el.style.display = el.style.display === 'flex' ? 'none' : 'flex';
}

function scrollTVCategories(dir) {
    const container = document.getElementById('tv-categories');
    container.scrollBy({ left: 200 * dir, behavior: 'smooth' });
}

function filterTVByCategory(catId, pill) {
    document.querySelectorAll('#tv-categories .genre-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentFilteredChannels = catId ? allChannels.filter(c => c.category_id == catId) : allChannels;
    renderTVGrid(currentFilteredChannels);
}

function nextChannel() {
    if (currentFilteredChannels.length === 0) return;
    currentChannelIdx++;
    if (currentChannelIdx >= currentFilteredChannels.length) currentChannelIdx = 0;
    const next = currentFilteredChannels[currentChannelIdx];
    playChannel(next.embed_url, next.name, next.logo_url);
}

function prevChannel() {
    if (currentFilteredChannels.length === 0) return;
    currentChannelIdx--;
    if (currentChannelIdx < 0) currentChannelIdx = currentFilteredChannels.length - 1;
    const prev = currentFilteredChannels[currentChannelIdx];
    playChannel(prev.embed_url, prev.name, prev.logo_url);
}

function playChannel(url, name, logo) {
    document.getElementById('tvPlayer').src = url;
    document.getElementById('tv-current-name').innerText = name;
    document.getElementById('tv-player-name').innerText = name;
    document.getElementById('tv-backdrop').style.backgroundImage = `url(${logo})`;
    
    // Atualiza o índice global para o botão "Próximo" saber onde está
    currentChannelIdx = currentFilteredChannels.findIndex(c => c.embed_url === url);
    
    if (window.innerWidth <= 768) toggleTVInfo(true);
}

function toggleTVInfo(minimize) {
    const body = document.getElementById('tv-body');
    if (minimize) {
        body.classList.add('minimized');
    } else {
        body.classList.remove('minimized');
    }
}

function closeTVModal() {
    document.getElementById('tv-modal').style.display = 'none';
    document.getElementById('tvPlayer').src = '';
    document.body.style.overflow = 'auto';
}

/* Lógica Descobrir (Estilo Maratonar) */
let cachedGenresDiscover = { movie: [], tv: [] };
let discoverHistory = [];
let currentDiscoverIdx = -1;
let isNavigatingDiscover = false;

async function openDiscover() {
    document.body.style.overflow = 'hidden';
    const carousel = document.getElementById('descobrir-carousel');
    carousel.style.display = 'flex';
    carousel.style.opacity = '1';
    
    // Reset Tabs to Synopsis
    const synopsisTabBtn = document.querySelector('#descobrir-carousel .tab-btn:first-child');
    if (synopsisTabBtn) switchTab(synopsisTabBtn, 'discover-synopsis-tab');
    
    if (cachedGenresDiscover.movie.length === 0) {
        try {
            const [mRes, tRes] = await Promise.all([
                fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=pt-BR`),
                fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=pt-BR`)
            ]);
            const [mG, tG] = await Promise.all([mRes.json(), tRes.json()]);
            cachedGenresDiscover.movie = mG.genres || [];
            cachedGenresDiscover.tv = tG.genres || [];
        } catch(e) { console.error("Erro gêneros discover:", e); }
    }

    if (discoverHistory.length === 0) {
        navDiscover(1);
    } else {
        const data = discoverHistory[currentDiscoverIdx];
        renderDiscoverItem(data.item, data.type, data.videoKey, data.recommendations);
    }
}

function closeDiscover() {
    document.getElementById('descobrir-carousel').style.display = 'none';
    const trailerContainer = document.getElementById('discover-trailer-container');
    if (trailerContainer) trailerContainer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

async function navDiscover(dir = 1) {
    if (dir === -1) {
        if (currentDiscoverIdx > 0) {
            currentDiscoverIdx--;
            const data = discoverHistory[currentDiscoverIdx];
            renderDiscoverItem(data.item, data.type, data.videoKey, data.recommendations);
        }
        return;
    }

    if (currentDiscoverIdx < discoverHistory.length - 1) {
        currentDiscoverIdx++;
        const data = discoverHistory[currentDiscoverIdx];
        renderDiscoverItem(data.item, data.type, data.videoKey, data.recommendations);
        return;
    }

    const types = ['movie', 'tv'];
    const type = types[Math.floor(Math.random() * types.length)];
    const page = Math.floor(Math.random() * 50) + 1;
    
    try {
        const res = await fetch(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&language=pt-BR&sort_by=popularity.desc&page=${page}`);
        const data = await res.json();
        const items = data.results.filter(i => i.overview && i.overview.length > 10 && i.backdrop_path);
        const item = items[Math.floor(Math.random() * items.length)];
        
        if (!item) return navDiscover(1);

        const extraRes = await fetch(`https://api.themoviedb.org/3/${type}/${item.id}?api_key=${API_KEY}&language=pt-BR&append_to_response=videos,recommendations`);
        let extraData = await extraRes.json();
        
        const trailer = extraData.videos.results.find(v => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube');
        if (!trailer) return navDiscover(1);

        const recs = extraData.recommendations ? extraData.recommendations.results : [];
        discoverHistory.push({ item, type, videoKey: trailer.key, recommendations: recs });
        currentDiscoverIdx++;
        
        renderDiscoverItem(item, type, trailer.key, recs);
    } catch (e) { 
        console.error("Erro Descobrir:", e);
    }
}

function renderDiscoverItem(item, type, videoKey, recommendations = []) {
    const title = item.title || item.name;
    const genres = cachedGenresDiscover[type] || [];
    const itemGenres = item.genre_ids ? item.genre_ids.map(id => {
        const g = genres.find(x => x.id === id);
        return g ? g.name : '';
    }).filter(n => n !== '').slice(0, 2).join(' • ') : (type === 'movie' ? 'Filme' : 'Série');
    
    const year = (item.release_date || item.first_air_date || '').split('-')[0];
    const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
    const poster = item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/200x300/111/fff?text=FF';

    // Atualizar Interface PC
    document.getElementById('discoverBg').style.backgroundImage = `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`;
    document.getElementById('discover-thumb').src = poster;
    document.getElementById('discoverTitle').innerText = title;
    document.getElementById('discoverGenre').innerText = itemGenres;
    document.getElementById('discoverRating').innerText = `⭐ ${rating}`;
    document.getElementById('discoverOverview').innerText = item.overview || 'Sinopse não disponível.';
    
    // Atualizar Interface Reels (Mobile)
    if (window.innerWidth <= 768) {
        document.getElementById('reels-title').innerText = title;
        document.getElementById('reels-thumb').src = poster;
        document.getElementById('reels-genre').innerText = itemGenres;
        document.getElementById('reels-rating').innerText = `⭐ ${rating}`;
        document.getElementById('reels-year').innerText = year;
        document.getElementById('reels-synopsis').innerText = item.overview || 'Sinopse não disponível.';
        
        // Injetar relacionados no Reels
        const reelsGrid = document.getElementById('reels-related-grid');
        reelsGrid.innerHTML = recommendations.slice(0, 10).map(i => renderMovieCard(i, type)).join('');
        reelsGrid.querySelectorAll('.movie-card').forEach(c => c.classList.add('related-item'));
        
        document.getElementById('reels-play-btn').onclick = () => { closeDiscover(); openPlayer(item.id, type); };
        
        // Animação de entrada
        const trailerContainer = document.getElementById('discover-trailer-container');
        trailerContainer.classList.remove('swipe-up-anim');
        void trailerContainer.offsetWidth; // Trigger reflow
        trailerContainer.classList.add('swipe-up-anim');
        
        // Resetar abas
        document.getElementById('reels-expanded').classList.remove('active');
        document.querySelectorAll('.btn-reels-tab').forEach(b => b.classList.remove('active'));
    }

    // Resetar estado de minimização
    document.getElementById('discover-body').classList.remove('minimized');
    
    // Verificar se precisa de "Ler mais"
    checkSynopsisOverflow('discoverOverview', 'discover-read-more');

    const origin = window.location.origin;
    const trailerContainer = document.getElementById('discover-trailer-container');
    if (trailerContainer) {
        // Mobile: sem controles, loop infinito para parecer Reels
        const isMobile = window.innerWidth <= 768;
        const params = isMobile ? `autoplay=1&controls=0&loop=1&playlist=${videoKey}&modestbranding=1&iv_load_policy=3` : `autoplay=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`;
        trailerContainer.innerHTML = `
            <iframe src="https://www.youtube-nocookie.com/embed/${videoKey}?${params}&origin=${origin}" 
                    allow="autoplay; encrypted-media" 
                    sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-presentation"
                    title="Discover Player"></iframe>`;
    }
    
    document.getElementById('discoverWatchBtn').onclick = () => {
        closeDiscover();
        openPlayer(item.id, type);
    };
    
    // Carregar Recomendações no Descobrir
    renderRecommendationsDiscover(recommendations, type);
    
    const prevBtn = document.getElementById('discoverPrevBtn');
    if (prevBtn) {
        prevBtn.style.display = (currentDiscoverIdx > 0) ? 'flex' : 'none';
    }
}

function switchReelsTab(tab) {
    const container = document.getElementById('reels-expanded');
    const isCurrentlyActive = container.classList.contains('active');
    const activeTab = document.querySelector('.reels-tab-content:not([style*="display: none"])');
    const targetId = tab === 'synopsis' ? 'reels-synopsis-tab' : 'reels-related-tab';
    const targetBtn = tab === 'synopsis' ? 'btn-reels-synopsis' : 'btn-reels-related';

    if (isCurrentlyActive && activeTab.id === targetId) {
        // Se clicar no mesmo botão já ativo, minimiza
        container.classList.remove('active');
        document.querySelectorAll('.btn-reels-tab').forEach(b => b.classList.remove('active'));
    } else {
        // Troca de aba ou abre
        container.classList.add('active');
        document.querySelectorAll('.btn-reels-tab').forEach(b => b.classList.remove('active'));
        document.getElementById(targetBtn).classList.add('active');
        
        document.getElementById('reels-synopsis-tab').style.display = tab === 'synopsis' ? 'block' : 'none';
        document.getElementById('reels-related-tab').style.display = tab === 'related' ? 'block' : 'none';
    }
}

// Sistema de Gestos Swipe (TikTok/Reels) - Agora no Overlay
let touchStartY = 0;
let touchEndY = 0;

const swipeTarget = document.getElementById('reels-swipe-overlay');
if (swipeTarget) {
    swipeTarget.addEventListener('touchstart', e => {
        touchStartY = e.changedTouches[0].screenY;
    }, false);

    swipeTarget.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    if (window.innerWidth > 768) return;
    const threshold = 50;
    if (touchStartY - touchEndY > threshold) {
        navDiscover(1);
    } else if (touchEndY - touchStartY > threshold) {
        navDiscover(-1);
    }
}

function renderRecommendationsDiscover(list, type) {
    const grid = document.getElementById('discover-related-grid');
    const container = document.getElementById('discover-related-container');
    if (!grid || !container) return;
    if (!list || list.length === 0) {
        container.classList.remove('show');
        return;
    }
    grid.innerHTML = list.slice(0, 15).map(item => renderMovieCard(item, type)).join('');
    container.classList.add('show');
    grid.querySelectorAll('.movie-card').forEach(card => card.classList.add('related-item'));
}

function showSynopsis(title, text) {
    document.getElementById('synopsisTitle').innerText = title;
    document.getElementById('synopsisText').innerText = text || 'Sinopse não disponível.';
    document.getElementById('synopsis-modal').style.display = 'flex';
}

function switchTab(btn, tabId) {
    const container = btn.parentElement.parentElement;
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
}

function closeSynopsis() {
    document.getElementById('synopsis-modal').style.display = 'none';
}

/* --- LÓGICA FUTEBOL AO VIVO (ESPN API) --- */
let currentLeague = 'bra.1'; 
let currentDateOffset = 0;

const LEAGUES = [
    { id: 'bra.1', name: 'Brasileirão Série A' },
    { id: 'bra.2', name: 'Série B' },
    { id: 'eng.1', name: 'Premier League' },
    { id: 'esp.1', name: 'LaLiga' },
    { id: 'uefa.champions', name: 'Champions League' },
    { id: 'uefa.europa', name: 'Europa League' },
    { id: 'ita.1', name: 'Serie A (ITA)' },
    { id: 'ger.1', name: 'Bundesliga' },
    { id: 'fra.1', name: 'Ligue 1' },
    { id: 'arg.1', name: 'Argentino' },
    { id: 'libertadores', name: 'Libertadores' }
];

async function loadFootballSection() {
    const container = document.getElementById('sections-container');
    container.innerHTML = `
        <h2 style="font-family:'Bebas Neue'; font-size:3rem; margin-top:20px; color:var(--primary); text-align:center;">Futebol ao Vivo e Placares</h2>
        
        <div class="sports-filters" id="league-filters"></div>
        <div class="sports-filters" style="justify-content: center;" id="date-filters">
            <button class="genre-pill" onclick="changeDate(-1)">Ontem</button>
            <button class="genre-pill active" onclick="changeDate(0)">Hoje</button>
            <button class="genre-pill" onclick="changeDate(1)">Amanhã</button>
        </div>

        <div id="sports-loader" style="text-align:center; padding:50px; font-size:1.2rem;">Carregando jogos...</div>
        <div class="sports-grid" id="sports-grid"></div>
    `;

    renderLeagueFilters();
    fetchScores();
}

function renderLeagueFilters() {
    const container = document.getElementById('league-filters');
    container.innerHTML = LEAGUES.map(league => `
        <div class="genre-pill ${league.id === currentLeague ? 'active' : ''}" onclick="changeLeague('${league.id}', this)">
            ${league.name}
        </div>
    `).join('');
}

function changeLeague(leagueId, pill) {
    document.querySelectorAll('#league-filters .genre-pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    currentLeague = leagueId;
    fetchScores();
}

function changeDate(offset) {
    document.querySelectorAll('#date-filters .genre-pill').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    currentDateOffset = offset;
    fetchScores();
}

async function fetchScores() {
    const grid = document.getElementById('sports-grid');
    const loader = document.getElementById('sports-loader');
    grid.innerHTML = '';
    loader.style.display = 'block';

    try {
        // Calcular data formatada YYYYMMDD
        const date = new Date();
        date.setDate(date.getDate() + currentDateOffset);
        const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');

        const url = `https://site.api.espn.com/apis/site/v2/sports/soccer/${currentLeague}/scoreboard?dates=${dateStr}`;
        const res = await fetch(url);
        const data = await res.json();

        loader.style.display = 'none';

        if (!data.events || data.events.length === 0) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:50px; opacity:0.5;">Nenhum jogo encontrado para esta data ou liga.</p>';
            return;
        }

        grid.innerHTML = data.events.map(event => renderMatchCard(event)).join('');
    } catch (e) {
        console.error("Erro ESPN API:", e);
        loader.innerText = 'Erro ao carregar dados da ESPN.';
    }
}

function renderMatchCard(event) {
    const competition = event.competitions[0];
    const status = event.status.type.state; // 'pre', 'in', 'post'
    const statusText = event.status.type.detail;
    const isLive = status === 'in';
    
    const homeTeam = competition.competitors.find(c => c.homeAway === 'home');
    const awayTeam = competition.competitors.find(c => c.homeAway === 'away');

    // Tentar encontrar canal de transmissão
    const broadcast = competition.broadcasts && competition.broadcasts.length > 0 
                      ? competition.broadcasts[0].names.join(', ') 
                      : 'Não informada';

    // Lógica para o botão "Assistir"
    // Se o jogo estiver ao vivo, tentamos levar ao player
    const canWatch = isLive;
    const watchAction = canWatch ? `onclick="watchMatch('${broadcast}')"` : '';
    
    return `
        <div class="match-card ${isLive ? 'live' : ''}">
            <div class="match-header">
                <span>${event.season.slug.toUpperCase()}</span>
                <span>${isLive ? '<span class="live-dot"></span>AO VIVO' : status === 'post' ? 'FINALIZADO' : 'AGUARDANDO'}</span>
            </div>
            <div class="match-teams">
                <div class="match-team">
                    <img src="${homeTeam.team.logo || 'https://via.placeholder.com/50'}" alt="">
                    <span>${homeTeam.team.displayName}</span>
                </div>
                <div class="match-score">
                    <div class="score-box">${homeTeam.score} - ${awayTeam.score}</div>
                    <div class="match-status">${statusText}</div>
                </div>
                <div class="match-team">
                    <img src="${awayTeam.team.logo || 'https://via.placeholder.com/50'}" alt="">
                    <span>${awayTeam.team.displayName}</span>
                </div>
            </div>
            <div style="font-size: 0.7rem; color: #888; text-align:center;">Transmissão: ${broadcast}</div>
            <button class="btn-watch-match ${!canWatch ? 'disabled' : ''}" ${watchAction}>
                <i class="fas fa-play"></i> ${canWatch ? 'ASSISTIR AGORA' : 'DISPONÍVEL AO VIVO'}
            </button>
        </div>
    `;
}

function watchMatch(broadcast) {
    // Abre o modal de TV
    openTVModal();
    
    // Pequeno delay para garantir que os canais carregaram
    setTimeout(() => {
        const query = broadcast.toLowerCase();
        // Tentar achar o melhor canal correspondente
        const found = allChannels.find(c => {
            const name = c.name.toLowerCase();
            return name.includes(query) || query.includes(name);
        });
        
        if (found) {
            playChannel(found.embed_url, found.name, found.logo_url);
        } else {
            // Se não achar exato, avisa o usuário ou deixa na lista geral
            console.log("Canal não encontrado automaticamente:", broadcast);
        }
    }, 1500);
}

