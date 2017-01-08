Vue.component('match', {
  template: "#match-template",
  props: ['match'],
});

Vue.component('shortDate', {
  template: "#shortdate-template",
  props: ['date'],
  methods: {
    formatDate: function()  {
      var realDate = new Date(this.date);
      var month = 0;
      switch(realDate.getUTCMonth())
      {
        case 0: month = 'Jan'; break;
        case 1: month = 'Feb'; break;
        case 2: month = 'Mar'; break;
        case 3: month = 'Apr'; break;
        case 4: month = 'Maj'; break;
        case 5: month = 'Jun'; break;
        case 6: month = 'Jul'; break;
        case 7: month = 'Aug'; break;
        case 8: month = 'Sep'; break;
        case 9: month = 'Okt'; break;
        case 10: month = 'Nov'; break;
        case 11: month = 'Dec'; break;
      }
      return realDate.getUTCDate() + " " + month
    }
  }
});

Vue.component('statistics', {
  template: "#statistics-template",
  props: ['match'],
  methods: {
    showStatistics: (match,events) => {
      var url = "/api/statistics/" + match.League +"/ROCKH/"+ match.Division +"/"+  match.Round;
      VanillaAjax.get(url, json => {
        alert(json);
      });
    },
    isDisabled: (date) => {
      var matchDate = new Date(date);
      var today = new Date();
      var notPlayedYet = matchDate > today;
      return {
          disabled: notPlayedYet
      }
    }
  }
});


VanillaAjax.get('api/matches', json => {
  var result = JSON.parse(json);
  new Vue({
    el: '#app',
    data: {
      matches: result
    }
  });
});
