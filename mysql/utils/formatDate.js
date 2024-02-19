const format = (date,locale,options) => 
    new Intl.DateTimeFormat(locale,options).format(date)
const now = new Date();
format( now, 'es')
format( now, 'en')
format( now, 'es', { dateStyle: 'long' } )
format( now, 'en', { weekDay: 'short', day: 'numeric' } )