export default function validateCPF(cpf: string): {valid: boolean, value: string} {
  const result = {
    valid: true,
    value: ''
  }

  cpf = cpf.replace(/[^\d]+/g, '');
  result.value = cpf;

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) result.valid = false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(9))) result.valid = false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.charAt(10))) result.valid = false;

  return result;
};