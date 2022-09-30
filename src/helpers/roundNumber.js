const roundNumber = (num) => {
  const objectLocaleString = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };
  const numberArredondado = num.toLocaleString('pt-BR', objectLocaleString);
  const numberWithoutSpace = numberArredondado.split('')
    .filter((_, index) => index !== 2).join('');
  const numberComvirgula = numberWithoutSpace.split('$')[1];
  const numberCorrigido = numberComvirgula.split(',');

  return numberCorrigido.join('.');
};

export default roundNumber;
