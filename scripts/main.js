Vue.component('match', {
  template: "#match-template",
  props: ['match',],
});

Vue.component('statistics', {
  template: "#statistics-template",
  props: ['round'],
});

Vue.component('shortDate', {
  template: "#shortdate-template",
  props: ['match'],
  methods: {
    formatDate: function()  {
      var realDate = new Date(this.match.Date);
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

Vue.component('showStatistics', {
  template: "#showstatistics-template",
  props: ['match'],
  methods: {
    showStatistics: (match,event) => {
      if(match.Result != "")
      {
          match.Result = "";
          
          return;
      }
        
      var parent = event.currentTarget.parentNode;
      var date = new Date(match.Date);
      var year = date.getFullYear() - 2000;
	    var season = date.getMonth() < 7 
        ? (year - 1).toString() + year.toString() 
        :  year.toString() + (year+1).toString();
        
      var url = "/api/statistics/ROCKH/stdf/" + season +"/"+ match.Division +"/"+  match.Round;
      VanillaAjax.get(url, table => {
          var obj = $.parseHTML(table);
          var results = [];
       
          $(obj).find('tr').each((rowIndex, row) => {
            if(rowIndex != 0)
            {
                var roundRegex = /^([DS])([1-9])$/;
                var round = roundRegex.exec(row.children[0].innerText);
                if(round)
                {
                    var clean = (s) => {
                        if(s == "&nbsp;"){
                          return '';
                        }
                        if(s.trim() == ''){
                          return '';
                        }
                        return s;
                    };
                    var set = (s) => {
                        var str = clean(s);
                        if(str == ''){
                          return '';
                        }
                        var res = s.split('\n');
                        if(res[1] == '0'){
                          return res[0] + " pil";
                        }
                        else{
                          return res[1] + " kvar";
                        }
                    };
                    var indx = (s,index) => {
                      var res = clean(s);
                      if(res == ''){
                        return res;
                      }
                      return res.split('-')[index].trim();
                    };
                    var result = {
                        round: round[1] + round[2],
                        player1: row.children[1].innerText,
                        player2: row.children[12].innerText,
                        player1Score: indx(row.children[23].innerText,0),
                        player2Score: indx(row.children[23].innerText,1),
                        player1Set1: set(row.children[2].innerText),
                        player2Set1: set(row.children[13].innerText),
                        player1Set2: set(row.children[3].innerText),
                        player2Set2: set(row.children[14].innerText),
                        player1Set3: set(row.children[4].innerText),
                        player2Set3: set(row.children[15].innerText),
                        player1Set4: set(row.children[5].innerText),
                        player2Set4: set(row.children[16].innerText),
                        player1Set5: set(row.children[6].innerText),
                        player2Set5: set(row.children[17].innerText),
                        player1Ton: clean(row.children[7].innerText),
                        player2Ton: clean(row.children[18].innerText),
                        player1180: clean(row.children[8].innerText),
                        player2180: clean(row.children[19].innerText),
                        player1High: clean(row.children[9].innerText) + ' ' + clean(row.children[10].innerText) + ' ' + clean(row.children[11].innerText),
                        player2High: clean(row.children[20].innerText) + ' ' + clean(row.children[21].innerText) + ' ' + clean(row.children[22].innerText),
                        player1Average: indx(row.children[24].innerText,0),
                        player2Average: indx(row.children[24].innerText,1),
                      };
                    results.push(result);
                }
                else {
                  results[results.length-1].player1 += ' ' + row.children[0].innerText;
                  results[results.length-1].player2 += ' ' + row.children[5].innerText;
                }
            }
          });

           match.Result = results;
      });
    },
    isDisabled: (match) => {
      var matchDate = new Date(match.Date);
      var today = new Date();
      var notPlayedYet = matchDate > today;
      return {
          hidden: notPlayedYet || match.Division == ""
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


