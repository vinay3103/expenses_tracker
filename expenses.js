document.addEventListener('DOMContentLoaded', () => {
    const expenseListContainer = document.getElementById('expense-list-container');
    const totalExpenditures = document.getElementById('total-expenditures');
    const clearAllBtn = document.getElementById('clear-all-btn');
    const backBtn = document.getElementById('back-btn');
  
    let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
  
    function renderExpenseList() {
      expenseListContainer.innerHTML = '';
      let total = 0;
      let dailyExpenses = {};
  
      // Group expenses by date
      expenseData.forEach(expense => {
        total += expense.amount;
        if (!dailyExpenses[expense.date]) {
          dailyExpenses[expense.date] = [];
        }
        dailyExpenses[expense.date].push(expense);
      });
  
      totalExpenditures.textContent = total.toFixed(2);
  
      // Render daily expenses
      for (let date in dailyExpenses) {
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('day-container');
        
        const dateHeader = document.createElement('h3');
        dateHeader.textContent = date;
        
        const dailyTotal = dailyExpenses[date].reduce((sum, expense) => sum + expense.amount, 0);
        const dailyTotalElement = document.createElement('p');
        dailyTotalElement.textContent = `Total: $${dailyTotal.toFixed(2)}`;
        dailyTotalElement.classList.add('daily-total');
        
        const expenseList = document.createElement('ul');
        expenseList.classList.add('expense-list');
        
        dailyExpenses[date].forEach((expense, index) => {
          const listItem = document.createElement('li');
          listItem.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
          
          const deleteBtn = document.createElement('button');
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => {
            deleteExpenseItem(index, date);
          });
          
          listItem.appendChild(deleteBtn);
          expenseList.appendChild(listItem);
        });
  
        dayContainer.appendChild(dateHeader);
        dayContainer.appendChild(dailyTotalElement);
        dayContainer.appendChild(expenseList);
        expenseListContainer.appendChild(dayContainer);
      }
    }
  
    function deleteExpenseItem(index, date) {
      expenseData = expenseData.filter((expense, i) => !(expense.date === date && i === index));
      localStorage.setItem('expenseData', JSON.stringify(expenseData));
      renderExpenseList();
    }
  
    clearAllBtn.addEventListener('click', () => {
      expenseData = [];
      localStorage.setItem('expenseData', JSON.stringify(expenseData));
      renderExpenseList();
    });
  
    backBtn.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  
    renderExpenseList();
  });
  