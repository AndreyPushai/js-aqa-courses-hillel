
let averageGrade = 100;

switch (true) {
    case averageGrade > 90:
        console.log("Відмінно");
        break;
    case averageGrade > 80:
        console.log("Дуже добре");
        break;
    case averageGrade > 70:
        console.log("Добре");
        break;
    case averageGrade >= 60:
        console.log("Задовільно");
        break;
    default:
        console.log("Незадовільно");
}

