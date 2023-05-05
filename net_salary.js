// eventos com os nav e menus
const menuBar = document.querySelector('.menuBar');
const menu = document.querySelector('.menu');
const container = document.querySelector('.container');
window.onload = function (){
    menuBar.addEventListener('click', () => {
        menu.setAttribute('style','display:flex');
        menu.classList.toggle('hide');
        if(menu.classList.contains('hide')){
            menu.setAttribute('style','display:none');
        }else {
            menu.setAttribute('style','display:flex');
            menu.classList.remove('hide');
        }
    });
    window.addEventListener('resize', function () {
        if(menu.classList.contains('menu') ){
            menu.removeAttribute('style','display:none');
            menu.classList.remove('hide')
        }
    })
}

// validação de dados (incompleta) preciso refazer

const salarioRegex = new RegExp(/^(0(,\d{1,2})?|[1-9]\d{0,9}(,\d{1,2})?)$/);
const descontosRegex = new RegExp(/^((,\d{0,2})?|[0-9]\d{0,9}(,\d{1,2})?)$/);
const salario = document.getElementById('salario');
const descontos = document.getElementById('descontos');
const dependentes = document.getElementById('dependentes');
let validator = {
    descontosIsValid: () => {
        if (descontosRegex.test(descontos.value) && descontos.value !== ""){
            return descontos.value;
        } else if (descontos.value == "") {
            return descontos.value = 0
        
        } else {
            descontos.innerHTML = descontos.value
            alert("preencha o campo corretamente: valores positivos menores que 1 bilhão de reais com até duas casas decimais e sem pontos")
        }
    },
    salaryIsValid: () => {
        if (salarioRegex.test(salario.value) && salario.value !== "0"){
            return salario.value
        }else {
            salario.value = ""
            salario.innerHTML = salario.value
            alert("preencha o campo corretamente: valores positivos menores que 1 bilhão de reais com até duas casas decimais e sem pontos")
        }
    }
}


// eventos com botao de submit e form
const botao = document.querySelector('botao');
const form = document.querySelector('form');
form.addEventListener('submit',function (submit) {
    
    submit.preventDefault();

    // Cálculo do salário bruto
    let valueS = parseFloat(validator.salaryIsValid(salario.value).toString().replace(",",".")); //arrumar
    console.log(validator.salaryIsValid(salario.value).toString().replace(",","."))
    console.log(valueS);
    console.log(typeof(valueS));
    grossSalaryValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueS);
    // Cálculo dos outros descontos e dependentes
    let valueDes = parseFloat(validator.descontosIsValid(descontos.value).toString().replace(",",".")); //arrumar
    let othersV = parseFloat(valueDes);
    console.log(valueDes);
    slOthersValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(othersV);
    // Cálculo do INSS
    if (valueS <= 1302.00) {
        let valueI = valueS*(0.075);
        console.log(valueI);
        slInssValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueI);
        slInssPercentBase.innerHTML = "7,5%";
        slInssPercent.innerHTML = `${((valueI/valueS*100).toFixed(1)).toString().replace(".",",")}%`;
    } else if (valueS > 1302.00 && valueS <= 2571.29)  {
        let valueI = (valueS*(0.09) - 19.53);
        console.log(valueI);
        slInssValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueI);
        slInssPercentBase.innerHTML = "9,0%";
        slInssPercent.innerHTML = `${((valueI/valueS*100).toFixed(1)).toString().replace(".",",")}%`;
    } else if (valueS > 2571.30 && valueS <= 3856.94)  {
        let valueI = (valueS*(0.12) - 96.67);
        console.log(valueI);
        slInssValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueI);
        slInssPercentBase.innerHTML = "12,0%";
        slInssPercent.innerHTML = `${(((valueI)/valueS*100).toFixed(1)).toString().replace(".",",")}%`;
    } else if (valueS > 3856.94 && valueS <= 7507.49)  {
        let valueI = (valueS*(0.14) - 173.81);
        console.log(valueI);
        slInssValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueI);
        slInssPercentBase.innerHTML = "14,0%";
        slInssPercent.innerHTML = `${(((valueI)/valueS*100).toFixed(1)).toString().replace(".",",")}%`;
    } else{
        let valueI = 877.25;
        console.log(valueI);
        slInssValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueI);
        slInssPercentBase.innerHTML = "TETO";
        slInssPercent.innerHTML = `${((valueI)/valueS*100).toFixed(1).toString().replace(".",",")}%`;
    }
    
    // Cálculo do IRRF
    let valueDep = dependentes.value * 189.59;
    let valueI = parseFloat(slInssValue.innerHTML.replace("R$&nbsp;","").replace(",","."));
    let baseIrrf = valueS - valueI - othersV - ~~valueDep;
    if (baseIrrf <= 2112.00){
        let valueIrrf = 0
        slIrrfPercent.innerHTML = "ISENTO";
        slIrrfValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueIrrf)
        slIrrfEtive.innerHTML = "0,0%";
    }else if (baseIrrf > 2112.00 && baseIrrf <= 2826.65 ){
        let valueIrrf = (baseIrrf*0.075 - 158.40);
        slIrrfValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueIrrf);
        slIrrfPercent.innerHTML = "7,5%";
        slIrrfEtive.innerHTML = `${((valueIrrf)/valueS*100).toFixed(1).toString().replace(".",",")}%`;
    }else if (baseIrrf > 2826.65 && baseIrrf <= 3751.05 ){
        let valueIrrf = (baseIrrf*0.15 - 370.40);
        slIrrfValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueIrrf);
        slIrrfPercent.innerHTML = "15,0%";
        slIrrfEtive.innerHTML = `${((valueIrrf)/valueS*100).toFixed(1).toString().replace(".",",")}%`;
    }else if (baseIrrf > 3751.05 && baseIrrf <= 4664.68 ){
        let valueIrrf = (baseIrrf*0.225 - 651.73)
        slIrrfValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueIrrf);
        slIrrfPercent.innerHTML = "22,5%";
        slIrrfEtive.innerHTML = `${((valueIrrf)/valueS*100).toFixed(1).toString().replace(".",",")}%`;
    }else{
        let valueIrrf = (baseIrrf*0.275 - 884.96)
        slIrrfValue.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueIrrf);
        slIrrfPercent.innerHTML = "27,5%";
        slIrrfEtive.innerHTML = `${((valueIrrf)/valueS*100).toFixed(1).toString().replace(".",",")}%`;
    }
    // Cálculo dos totais e do salário líquido
    totalValueGrossSalary.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueS);
    let valueIrrf = parseFloat(slIrrfValue.innerHTML.replace("R$&nbsp;","").replace(".","").replace(".","").replace(",","."));
    let totalD = valueIrrf + valueI + othersV;
    totalDiscountsGrossSalary.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalD)
    totalGrossSalaryLiquid.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format((valueS - totalD));

    // Resumo dos cálculos
    let valueResult = valueIrrf;
    resumeResult.innerHTML = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valueIrrf);
    let valueResultPerc = (valueResult/valueS*100);
    resumeResultPerc.innerHTML = `${valueResultPerc.toFixed(2).toString().replace(".",",")}%`;

    // esconder as divs de resultado e resumo (incompleto)
    // arrumar erro ao coverter em string
    resultado = document.querySelector('#resultado');
    resumo = document.querySelector('#resumo');
    if (validator.salaryIsValid(salario.value) && validator.descontosIsValid(descontos.value)){
        resultado.style.display = "inherit";
        resumo.style.display = "inherit";
    } else{
        resultado.style.display = "none";
        resumo.style.display = "none";
    }
})


