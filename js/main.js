//Tạo mảng activities chứa các activity từ input
let activities = [];

//Tạo mảng completeds chứa các activity đã dc đánh dấu hoàn thành
let completeds = [];

dom("#addItem").onclick = function () {
  //dom để lấy dữ liệu từ input
  let activity = dom("#newTask").value;

  //Thêm activity từ input vào mảng activities
  activities.push(activity);

  //Gọi hàm display để hiển thị ra màn hình
  display(activities);
};

//Hàm display để hiển thị ra màn hình todo
function display(activities, completeds) {
  let html = activities.reduce((result, activity) => {
    return (
      result +
      `
            <li>
            ${activity}
            <div class="buttons">
            <button class="remove" data-type="delete" data="${activity}">
            <i class="fa-solid fa-trash" data-type="delete" data="${activity}"></i>
            </button>
            <button class="complete" data-type="checked" data="${activity}"><i class="fa-regular fa-circle-check" data-type="checked" data="${activity}"></i></button>
            </div>
            </li>
        `
    );
  }, "");

  dom("#todo").innerHTML = html;

  if (!!completeds) {
    let html2 = completeds.reduce((result, activity) => {
      return (
        result +
        `
                  <li>
                  ${activity}
                  <div class="buttons">
                  <button class="remove" data-type="delete" data="${activity}">
                  <i class="fa-solid fa-trash" data-type="delete" data="${activity}"></i>
                  </button>
                  <button class="complete"><i class="fa-solid fa-circle-check fas" ></i></button>
                  </div>
                  </li>
              `
      );
    }, "");

    dom("#completed").innerHTML = html2;
  }

  
}

//Hàm DOM
function dom(selector) {
  return document.querySelector(selector);
}

//Lắng nghe sự kiện click ở #todo
dom("#todo").addEventListener("click", (evt) => {
  let elType = evt.target.getAttribute("data-type");
  let data = evt.target.getAttribute("data");

  //Tìm index của activity vừa click trong mảng activities
  let index = activities.findIndex((activity) => {
    return activity === data;
  });

  //Nếu là nhấn vào nút delete
  if (elType === "delete") {
    //Xóa phần tử có index vừa tìm dc ở trên trong mảng activities
    activities.splice(index, 1);

    //Gọi hàm display để hiển thị ra màn hình
    display(activities, completeds);
  }

  //Nếu là nhấn vào nút checked
  if (elType === "checked") {
    //Xóa phần tử có index vừa tìm dc ở trên trong mảng activities
    activities.splice(index, 1);

    //Thêm phần tử đó vào trong mảng completeds thông qua attribute data
    completeds.push(data);

    //Gọi hàm display để hiển thị ra màn hình
    display(activities, completeds);
  }
});

//Hàm sắp sếp theo tứ tự từ A -> Z
function sortAlphaDown() {
  activities.sort();
  display(activities, completeds);
}

//Hàm sắp sếp theo tứ tự từ Z -> A
function sortAlphaUp() {
  activities.sort((a, b) => {
    if(a < b) { return 1; }
    if(a > b) { return -1; }
    return 0;
  });
  display(activities, completeds);
}
