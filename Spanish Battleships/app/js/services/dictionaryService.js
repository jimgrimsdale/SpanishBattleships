battleshipsApp.factory('dictionaryService', function () {
  var verbDictionary = [
    {
      verb: 'ser',
      present: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
      imperfect: ['yo era', 'eras', 'era', 'éramos', 'érais', 'eran'],
      preterite: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron']
    },
    {
      verb: 'estar',
      present: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'estan'],
      imperfect: ['yo estaba', 'estabas', 'estaba', 'estábamos', 'estabais', 'estaban'],
      preterite: ['estuve', 'estuviste', 'estuvo', 'estuvimos', 'estuvisteis', 'estuvieron']
    },
    {
      verb: 'cantar',
      present: ['canto', 'cantas', 'canta', 'cantamos', 'cantáis', 'cantan'],
      imperfect: ['yo cantaba', 'cantabas', 'cantaba', 'cantábamos', 'cantabais', 'cantaban'],
      preterite: ['canté', 'cantaste', 'cantó', 'cantamos', 'cantasteis', 'cantaron']
    },
    {
      verb: 'leer',
      present: ['leo', 'lees', 'lee', 'leemos', 'leéis', 'leen'],
      imperfect: ['yo leía', 'leías', 'leía', 'leíamos', 'leíais', 'leían'],
      preterite: ['leí', 'leiste', 'leyó', 'leímos', 'leisteis', 'leyeron']
    },
    {
      verb: 'poder',
      present: ['puedo', 'puedes', 'puede', 'podemos', 'podéis', 'pueden'],
      imperfect: ['yo podía', 'podías', 'podía', 'podíamos', 'podíais', 'podían'],
      preterite: ['pude', 'pudiste', 'pudo', 'pudimos', 'pudisteis', 'pudieron']
    },
    { 
      verb: 'nadar',
      present: ['nado', 'nadas', 'nada', 'nadamos', 'nadáis', 'nadan'],
      imperfect: ['yo nadaba', 'nadabas', 'nadaba', 'nadábamos', 'nadabais', 'nadaban'],
      preterite: ['nadé', 'nadaste', 'nadó', 'nadamos', 'nadasteis', 'nadaron']
    },
    { 
      verb: 'estudiar',
      present: ['estudio', 'estudias', 'estudia', 'estudiamos', 'estudiáis', 'estudian'],
      imperfect: ['yo estudiaba', 'estudiabas', 'estudiaba', 'estudiábamos', 'estudiabais', 'estudiaban'],
      preterite: ['estudié', 'estudiaste', 'estudió', 'estudiamos', 'estudiasteis', 'estudiaron']
    },
    { 
      verb: 'lavar',
      present: ['lavo', 'lavas', 'lava', 'lavamos', 'laváis', 'lavan'],
      imperfect: ['yo lavaba', 'lavabas', 'lavaba', 'lavábamos', 'lavabais', 'lavaban'],
      preterite: ['lavé', 'lavaste', 'lavó', 'lavamos', 'lavasteis', 'lavaron']
    },
    { 
      verb: 'limpiar',
      present: ['limpio', 'limpias', 'limpia', 'limpiamos', 'limpiáis', 'limpian'],
      imperfect: ['yo limpiaba', 'limpiabas', 'limpiaba', 'limpiábamos', 'limpiabais', 'limpiaban'],
      preterite: ['limpié', 'limpiaste', 'limpió', 'limpiamos', 'limpiasteis', 'limpiaron']
    },
    { 
      verb: 'jugar',
      present: ['juego', 'juegas', 'juega', 'jugamos', 'jugáis', 'juegan'],
      imperfect: ['yo jugaba', 'jugabas', 'jugaba', 'jugábamos', 'jugabais', 'jugaban'],
      preterite: ['jugué', 'jugaste', 'jugó', 'jugamos', 'jugasteis', 'jugaron']
    },
    { 
      verb: 'tocar',
      present: ['toco', 'tocas', 'toca', 'tocamos', 'tocáis', 'tocan'],
      imperfect: ['yo tocaba', 'tocabas', 'tocaba', 'tocábamos', 'tocabais', 'tocaban'],
      preterite: ['toqué', 'tocaste', 'tocó', 'tocamos', 'tocasteis', 'tocaron']
    },
    { 
      verb: 'trabajar',
      present: ['trabajo', 'trabajas', 'trabaja', 'trabajamos', 'trabajáis', 'trabajan'],
      imperfect: ['yo trabajaba', 'trabajabas', 'trabajaba', 'trabajábamos', 'trabajabais', 'trabajaban'],
      preterite: ['trabajé', 'trabajaste', 'trabajó', 'trabajamos', 'trabajasteis', 'trabajaron']
    }
  ];

  var providedVerbs = [];

  return {
    get12Verbs: function get12Verbs (tense) {
      var verbsToReturn = [];
      providedVerbs = [];
      angular.forEach(verbDictionary, function (entry) {
        switch (tense) {
          case "present": verbsToReturn.push({ verb: entry.verb, verbs: entry.present });
            providedVerbs.push.apply(providedVerbs, entry[tense]);
            break;
          case "imperfect": verbsToReturn.push({ verb: entry.verb, verbs: entry.imperfect });
            providedVerbs.push.apply(providedVerbs, entry[tense]);
            break;
          case "preterite": verbsToReturn.push({ verb: entry.verb, verbs: entry.preterite });
            providedVerbs.push.apply(providedVerbs, entry[tense]);
            break;
        }        
      });
      // todo: getRandom 12 verbs
      return verbsToReturn;
    },
    getProvidedVerbs: function () {
      return providedVerbs;
    }
  };
});