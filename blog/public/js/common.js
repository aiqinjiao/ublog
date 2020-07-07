// 获取表单中用户输入的内容
function serializeArrayToJson(from) {
    var result = {};
    // serializeArray()  获取表单中用户输入的内容
    // [{name: 'email', value:'用户输入的内容'}]
    var f = from.serializeArray();
    f.forEach(function (item) {
        // result.email
        result[item.name] = item.value;
    });
    // {emali: 'pink@ublog.com', password: '123456'}
    return result;
}
