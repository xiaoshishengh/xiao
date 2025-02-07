let display = document.getElementById('display');

function appendToDisplay(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLastChar() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        // 使用 Function 构造器来计算表达式
        const result = new Function('return ' + display.value)();
        
        // 检查结果是否为有效数字
        if (isNaN(result) || !isFinite(result)) {
            throw new Error('无效计算');
        }
        
        // 显示结果，最多显示 8 位小数
        display.value = Number(result.toFixed(8));
    } catch (error) {
        display.value = '错误';
        setTimeout(clearDisplay, 1000);
    }
}

// 添加键盘支持
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    // 数字键和运算符
    if (/[\d\+\-\*\/\.\(\)]/.test(key)) {
        appendToDisplay(key);
    }
    // 回车键计算结果
    else if (key === 'Enter') {
        calculate();
    }
    // 退格键删除
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    // Escape 键清除
    else if (key === 'Escape') {
        clearDisplay();
    }
}); 