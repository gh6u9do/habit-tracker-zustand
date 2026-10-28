
// функция возвращает массив дат текущей недели
export const getCurrentWeekDays = ():string[] => {

    // берем текущую дату
    const dynamicDate = new Date();

    // получаем код дня
    let dayCode = dynamicDate.getDay();

    // проверяем воскресенье ли это, если воскресенье то ставим 7
    if(dayCode === 0 ) {
        dayCode = 7;
    }

    // получаем чистый понедельник
    dynamicDate.setDate(dynamicDate.getDate() - (dayCode - 1));

    // возвращаемый массив
    const dateArr = [];

    // проходимся циклом и заполняем массив
    for(let i = 0; i < 7; i++) {
        dateArr[i] = dynamicDate.toLocaleDateString('en-CA');
        dynamicDate.setDate(dynamicDate.getDate() + 1);
    }

    return dateArr;
}