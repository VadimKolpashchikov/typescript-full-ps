{
    const revenue = 1000;
    const bonus = 500;
    const res = revenue + bonus;
    console.log(res);
    const s = '1000';
    const b = true;
}
{
    function getFullName(firstName, surName) {
        return `${firstName} ${surName}`;
    }
    const getFullNameArrow = (firstName, surName) => {
        return `${firstName} ${surName}`;
    };
}
{
    function getFullName(user) {
        return `${user.firstName} ${user.surName}`;
    }
    const user = {
        firstName: 'John',
        surName: 'Five',
        city: 'Moscow',
        age: 25,
        skills: {
            dev: true,
            devops: true,
        },
    };
    console.log(getFullName(user));
    const info = {
        officeId: 0,
        isOpened: false,
        contacts: {
            phone: '',
            email: '',
            address: {
                city: '',
            },
        },
    };
}
{
    const skills = ['html', 'css', 'js'];
    for (const skill of skills) {
        console.log(skill.toUpperCase());
    }
    skills
        .filter((s) => s !== 'css')
        .map((s, i) => i + 1)
        .reduce((a, b) => a + b);
}
{
    const skill = ['Dev', 1];
    const skillName = skill[0];
    const skillLevel = skill[1];
    const [name, level] = skill;
    const arr = ['1', 1, true, false, false];
}
{
    const skill = ['Dev', 1];
    const skills = ['html', 'css', 'js'];
}
{
    let StatusCode;
    (function (StatusCode) {
        StatusCode[StatusCode["SUCCESS"] = 1] = "SUCCESS";
        StatusCode[StatusCode["IN_PROCESS"] = 2] = "IN_PROCESS";
        StatusCode[StatusCode["FAil"] = 3] = "FAil";
    })(StatusCode || (StatusCode = {}));
    let StatusCodeWord;
    (function (StatusCodeWord) {
        StatusCodeWord["SUCCESS"] = "s";
        StatusCodeWord["IN_PROCESS"] = "p";
        StatusCodeWord["FAil"] = "f";
    })(StatusCodeWord || (StatusCodeWord = {}));
    let StatusCodeHeterogenous;
    (function (StatusCodeHeterogenous) {
        StatusCodeHeterogenous[StatusCodeHeterogenous["SUCCESS"] = 1] = "SUCCESS";
        StatusCodeHeterogenous["IN_PROCESS"] = "p";
        StatusCodeHeterogenous["FAil"] = "f";
    })(StatusCodeHeterogenous || (StatusCodeHeterogenous = {}));
    const res = {
        message: 'Успех',
        statusCode: StatusCode.SUCCESS,
    };
    function action(statusCode) {
        return statusCode;
    }
    action(StatusCodeHeterogenous.FAil);
    action(1);
    function compute(arg) {
        return arg * 3;
    }
    let Roles;
    (function (Roles) {
        Roles[Roles["ADMIN"] = 1] = "ADMIN";
        Roles[Roles["USER"] = compute(Roles.ADMIN)] = "USER";
    })(Roles || (Roles = {}));
    let Roles2;
    (function (Roles2) {
        Roles2[Roles2["ADMIN"] = 1] = "ADMIN";
        Roles2[Roles2["USER"] = 2] = "USER";
    })(Roles2 || (Roles2 = {}));
    const adminCode = Roles2.ADMIN;
    let ReqStates;
    (function (ReqStates) {
        ReqStates["PUBLISHED"] = "published";
        ReqStates["DRAFT"] = "draft";
        ReqStates["DELETED"] = "deleted";
    })(ReqStates || (ReqStates = {}));
    async function getFaqs(req) {
        const res = await fetch('/faqs', {
            method: 'POST',
            body: JSON.stringify(req),
        });
        const data = await res.json();
        return data;
    }
}
export {};
