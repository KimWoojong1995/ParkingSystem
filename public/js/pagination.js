function pagination (totalData, currentPage, pages) {
    const dataPerPage = 10;
    const pageCount = 5;

    const totalPage = Math.ceil(totalData / dataPerPage);
    const pageGroup = Math.ceil(currentPage / pageCount);

    let last = pageGroup * pageCount;

    if (last > totalPage) {
        last = totalPage;
    }
    let first = last - (pageCount - 1);

    const next = last + 1;
    const prev = first - 1;

    if (totalPage < 1){
        first = last;
    }

    if (first > 5) {
        pages.innerHTML += `<li><a class="btn" href="${prev}">prev</a></li>`;
    }
    for (let i = first; i <= last; i++){
        if (currentPage === i) {
            pages.innerHTML += `<li><a class="btn" href="${i}">${i}</a></li>`;
        } else if (i > 0) {
            pages.innerHTML += `<li><a class="btn" href="${i}">${i}</a></li>`;
        }
    }
    if (next > 5 && next < totalPage) {
        pages.innerHTML += `<li><a class="btn" href="${next}">next</a></li>`;
    }
}