const formatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

exports.formatCurrency = function(value) { return formatter.format(value); }