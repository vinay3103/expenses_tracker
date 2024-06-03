document.getElementById('expense-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const itemName = document.getElementById('item-name').value;
  const itemAmount = parseFloat(document.getElementById('item-amount').value);
  const itemDate = new Date().toLocaleDateString(); // Get current date
  
  const expense = {
    name: itemName,
    amount: itemAmount,
    date: itemDate
  };
  
  let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
  expenseData.push(expense);
  localStorage.setItem('expenseData', JSON.stringify(expenseData));
  
  document.getElementById('expense-form').reset();
});
