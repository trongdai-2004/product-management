const buttonsStatus = document.querySelectorAll("[button-status]");
if (buttonsStatus.length > 0) {

    let url = new URL(window.location.href);
    // console.log(url)
    buttonsStatus.forEach(button => {
        button.addEventListener("click", () => {

            const status = button.getAttribute("button-status");
            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }
            // console.log(url.href)
            window.location.href = url.href;
        });
    });
}

// From Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    })
}
// end From search


// pagination

const buttonsPagination = document.querySelectorAll("[button-pagination]");
console.log(buttonsPagination);

if (buttonsPagination) {
    let url = new URL(window.location.href);

    buttonsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");


            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}

// end pagination


// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name= 'checkall']")

    const inputsId = checkboxMulti.querySelectorAll("input[name= 'id']");

    inputCheckAll.addEventListener("click", () => {

        if (inputCheckAll.checked) {
            inputsId.forEach(input => {
                input.checked = true;
            });
        } else {
            inputsId.forEach(input => {
                input.checked = false;
            });
        }

    });

    inputsId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkboxMulti.querySelectorAll(
                "input[name= 'id']:checked"
            ).length;

            if (countChecked == inputsId.length) {
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    });
}
//end checkbox multi


// form change multi

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault();


        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked = checkboxMulti.querySelectorAll(
            "input[name= 'id']:checked"
        );

        const typeChange = e.target.elements.type.value;
        console.log(typeChange)

        if (typeChange == "delete-all") {
            const isConfỉm = confirm("Bạn có chất muốn xóa những sản phẩm này không !  ");
            if (!isConfỉm) {
                return;
            }

        }


        if (inputsChecked.length > 0) {
            let ids = [];
            const inputsId = formChangeMulti.querySelector("input[name ='ids']")
            inputsChecked.forEach(input => {
                const id = input.value;
                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name='position']").value;


                    
                    ids.push(`${id}-${position}`);
                } else {
                    ids.push(id);
                }

            });


            inputsId.value = ids.join(",")
            formChangeMulti.submit();

        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi");
        }

    })
}


// end form change multi


// show-alert


const showAlert = document.querySelector("[show-alert]");

if (showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, time);
    closeAlert.addEventListener("click", ()=>{
         showAlert.classList.add("alert-hidden")
    })
}


// end show-alert
