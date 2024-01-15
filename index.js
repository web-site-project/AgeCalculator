let DayInput = document.querySelector("#Day"),
    MonthInput = document.querySelector("#Month"),
    YearInput = document.querySelector("#Year"),
    DayOutput = document.querySelector("#DayOutput"),
    MonthOutput = document.querySelector("#MonthOutput"),
    YearOutput = document.querySelector("#YearOutput"),
    btnOnclik = document.querySelector("#btnClick");

let EmptyError = (Element) => {
    let innerElement = Element instanceof Array ? Element : [Element];
    let backvalue = true;
    innerElement.map((ele) => {
        if (ele.value == "") {
            ele.nextElementSibling.textContent = "This feild is required";
            ele.parentElement.classList.add("empty");
            backvalue =  false;
        } else {
            ele.nextElementSibling.textContent = "";
            ele.parentElement.classList.remove("empty");
        }
    });

    return backvalue;
};

let inputValid = (invalid, condition) => {
    let innercondition = condition instanceof Array ? condition : [condition];
    let innerinvalid = invalid instanceof Array ? invalid : [invalid];
    let backvalue = true;
    innerinvalid.map((ele, index) => {
        if (ele.value > innercondition[index]) {
            ele.nextElementSibling.textContent = `must be a valid ${ele.getAttribute("name")}`;
            ele.parentElement.classList.add("invalid");
            backvalue = false;
        } else {
            ele.nextElementSibling.textContent = "";
            ele.parentElement.classList.remove("invalid");
        }
    });

    return backvalue;
};

let CalcuDate = (Day, Month, Year) => {
    let currentDate = new Date();
    let userDate = new Date(Year, Month, 0);
    let userDay = userDate.getDate();
    let currentDay = currentDate.getDate(),
        currentMonth = currentDate.getMonth() + 1,
        currentYear = currentDate.getFullYear();

    Year = currentYear - Year;

    if (currentMonth >= Month) {
        Month = currentMonth - Month;
    } else {
        Year--;

        Month = 12 + currentMonth - Month;
    }

    if (currentDay >= Day) {
        Day = currentDay - Day;
    } else {
        Month--;

        Day = userDay + currentDay - Day;

        if (Month < 0) {
            Month = 11;

            Year--;
        }
    }
    return [Day, Month, Year];
};
btnOnclik.onclick = () => {
    let empty = EmptyError([DayInput, MonthInput, YearInput]);

    if (empty) {
        let valid = inputValid(
            [DayInput, MonthInput, YearInput],
            [31, 12, new Date().getFullYear()]
        );

        if (valid) {
            let [Day, Month, Year] = CalcuDate(
                DayInput.value,
                MonthInput.value,
                YearInput.value
            );

            DayOutput.textContent = Day;
            MonthOutput.textContent = Month;
            YearOutput.textContent = Year;

            btnOnclik.style.backgroundColor = "#000000";
        }
    }
};
