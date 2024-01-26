//roles.js
import { createAction } from "../more/Action.js";

   
 export const roles = {
    villager: () => ({
      roleName: 'Aldeano',
      emoji: '👱',
      team: 'Aldeanos',
      weight: '1',
      winCondition:'vive al menos un representante del pueblo ' +
        'y no hay más lobos / piromano / asesinos en serie vivos',
    }),
    apprenticeSeer: () => ({
      ...roles.villager(),
      roleName: 'Aprendiz de vidente',
      emoji: '🙇‍♂',
      weight: '5.5',
      notes: ['Si el Vidente muere, el aprendiz tomará su lugar.'],
    }),
    beauty: () => ({
      ...roles.villager(),
      roleName: 'Bella',
      emoji: '💅',
      weight: '0.5',
      notes: [
        'Si un jugador con un rol nocturno intenta visitarte o' +
          ' matarte, en su lugar te amará.',
      ],
    }),
    beholder: () => ({
      ...roles.villager(),
      roleName: 'Observadora',
      emoji: '👁',
      weight:'Si hay un vidente, entonces 4.5. En otros casos - 2.',
      actions:
        roles.seer().actions === undefined
          ? null
          : { ...roles.seer().actions },
      notes: [
            'La observadora ve si hay un vidente al comienzo del juego.',
            'La observadora verá si el aprendiz del vidente toma el lugar de su maestro.'
        ],
    }),
    blacksmith: () => ({
      ...roles.villager(),
      roleName: 'Herrero',
      emoji: '⚒',
      weight:
        'Si hay un Lobo, entonces 8. Si hay un Traidor o Salvaje, entonces 4.5. En otros casos - 3.5.',
      actions: {
            spread: createAction({
            name:
            'Esparce polvo de plata por todas partes en el suelo,' +
            ' protegiendo así al pueblo del ataque de los lobos la próxima noche.',
            execute: "spread",
            times: 1,
            }),
           },
      notes: [
        'Si el Herrero decide esparcir polvo de plata, todos los jugadores lo sabrán.',
      ],
    }),
  
    bodyguard: () => ({
      ...roles.villager(),
      roleName: 'Guardaespaldas',
      emoji: '🛡',
      weight: '0',
      actions: {
        spread: createAction({
        name:'Capaz de proteger a alguien cada noche..',
        execute: "protect",
        times: 2,
        }),
       },
      notes: [
        'Capaz de proteger a alguien cada noche.' +
          'Si se ataca al guardaespaldas o al objetivo, ninguno muere.' +
          'El próximo ataque matará al guardaespaldas',
      ],
    }),
    cannibal: () => ({
     ...roles.arsonist() || [],
     roleName:'C/aníbal',
     emoji:'🧑🏾🍖',
     team:'Cann/ibal',
     weight:'-8',
     actions: {
        eat: createAction({
        name:'Comerte a un jugador(es)',
        execute: "eat",
        times:Infinity,
        }),
        saveHungry: createAction({
        name:'Capaz de proteger a alguien cada noche..',
        execute: "saveHungry",
        times:Infinity,
        }),
       },
     notes:['Saliste huyendo de cuba con tremenda hambre. Capaz de comer un jugador o ahorrar hambre todas las noches.'+
     'Ahorrar hambre te permitirá comer más personas en la misma noche.','Cada noche que no comes a un jugador se te agrega un punto de hambre y puede tener hasta 5 puntos de hambre.',
     ' No puedes ser asesinado por hombres lobo.']
    }),
    clumsyGuy: () => ({
      ...roles.villager(),
      roleName: 'Torpe',
      emoji: '🤕',
      weight: '-1',
      notes: [
        'Tiene un 50% de posibilidades de votar por un jugador aleatorio, excluyendo a su objetivo inicial y a sí mismo.',
      ],
    }),
    cowboy: () => ({
      ...roles.villager(),
      roleName: 'Vaquero',
      emoji: '🤠',
      weight: '4.5',
      notes: [
        'Si el vaquero muere, puede dispararle a uno de los jugadores.',
        'Si el ladrón intenta robarle el rol al vaquero, entonces con una probabilidad del 50% el vaquero puede matar al ladrón.',
      ],
    }),
    cupid: () => ({
      ...roles.villager(),
      roleName: 'Cupido',
      emoji: '🏹',
      weight: '2',
      actions: {
        link: createAction({
            name:'Puede vincular a dos jugadores cualesquiera, incluido él mismo, con lazos amorosos.',
            execute: "link",
            times:1,
            }),
          },
    }),
    cursed: () => ({
      ...roles.villager(),
      roleName: 'Maldito',
      emoji: '😾',
      weight:
        'Si hay lobos, entonces (1 - (cantidad de lobos \\* 2)). En otros casos - 1.',
      notes: ['Si un lobo muerde al Maldito, se convierte en Lobo.'],
    }),
    detective: () => ({
      ...roles.villager(),
      roleName: 'Detective',
      emoji: '🕵️',
      weight: '8.5',
      actions: {
        investigate: createAction({
            name:'Puede vincular a dos jugadores cualesquiera, incluido él mismo, con lazos amorosos.',
            execute: "investigate",
            times:1,
            }),
          },
     notes:['Si el detective mira al Lobo, entonces el Lobo lo sabrá.']
    }),
    doubleVoter: () => ({
      ...roles.villager(),
      roleName: 'Double voter',
      emoji: '🗳️',
      weight: '3',
      notes: [
        'When lynched, all alive players can vote twice during the day.',
      ],
    }),
    baker: () => ({
      ...roles.villager(),
      roleName: 'Panadero',
      emoji: '🥯',
      weight: '3',
      notes: [
        'When died, all alive players cannot vote during the next day.',
      ],
    }),
    druid: () => ({
     ...roles.villager(),
     roleName:'Druida',
     emoji:'🌿🐺',
     weight:'7',
     actions:{
         protect:createAction({
           times:Infinity,
           name:'Proteger',
           execute:"protect"
       }),
         attack:createAction({
           times:Infinity,
           name:'Atacar',
           execute:"protect"
       } )
     } ,
     notes:['eres un druida' +'Puedes proteger o atacar a un jugador cada noche']
   }),
   drunk :() =>({
     ...roles.villager(),
     roleName:'Borracho',
     emoji:'🍺',
     weight:'Si hay un lobo en el juego, entonces 3. En otros casos - 1.',
     notes:['Si el lobo mata al borracho, todos los lobos no podrán elegir un objetivo la próxima noche.'],
   }),
   fool: () => ({
     ...roles.seer(),
     roleName:'Necio',
     emoji:'🃏',
     weight:'5',
     actions:{
         blindedVision:{
           times:'2'
       }
     },
     notes:[
       'Tiene un 50% de posibilidades de ver el rol correcto del jugador,' +
       ' y un 50% de posibilidades de ver cualquier rol vivo en este juego, excepto el correcto y el suyo.',
       ...roles.seer().notes || []
     ]
   }),
   ghost:()=>({
   ...roles.villager(),
   roleName:'fantasma',
   emoji: '👻',
   weight: '3',
   actions: {
    lynch: createAction({
        name:'Lynch after death',
        execute: "vote",
        times:3,
        }),
      },
   notes:'Tiene la habilidad de seguir linchando cuando este muerto desde la tumba' 
   }),
   guardianAngel :() =>({
     ...roles.villager(),
     roleName:'Ángel guardián',
     emoji:'👼',
     weight:'7.5',
     actions:{
         protect:{
           times:Infinity,
           name:"Proteger a cualquier jugador"
       }
     },
     notes:['Si el Ángel Guardián logra salvar al jugador, el jugador salvado lo sabrá.',
       'Si atacan al jugador elegido varias veces a la vez, el Ángel Guardián lo sabrá.',
       'Si el Ángel Guardián intenta proteger al Asesino en Serie, morirá.',
       'Si el Ángel Guardián intenta proteger al lobo, morirá con una probabilidad del 50%.',
       'Si la Ramera viene a visitar al jugador y muere, el Ángel Guardián no podrá salvarla.'
   ]
   }),
   gunner :() =>({
     ...roles.villager(),
     roleName:'Justiciero',
     emoji:'🔫',
     weight:'7',
     actions:{
         shoot:{
           times:'2',
           name:'Elige a un jugador en el que quiere disparar.',
       }
     },
     notes:[
       'Después del disparo, todos los jugadores se enteran del asesinato.',
       'Tiene 2 balas.'
   ]
   }),  
   harlot: () => ({
    ...roles.villager(),
    roleName: 'Ramera',
    emoji: '💋',
    weight: '4.5',
    actions: {
        visit: {
          times: 2,
          name:'Elige a un jugador. Juntos pasarán una noche maravillosa que nunca olvidarán.',
      },
    },
    notes: [
      'Si eliges a un lobo o Asesino en Serie, serás asesinado.',
      'Si eliges a alguien más, ese jugador sabrá que alguien vino a visitarlo.',
      'Cuando la Ramera no está en casa, los lobos no pueden comérsela.',
      'El Asesino en Serie puede matar a la Ramera incluso si se fue con alguien por la noche.',
    ],
  }),
  healer: () => ({
    ...roles.villager(),
    roleName: 'Healer',
    emoji: '💊',
    weight: '3',
    actions:createAction({
      revive:{
        times:1,
        name:"Selecciona a un jugador muerto",
        execute:"revive"
      },
   }),
    notes: [
      'The Healer can heal a player once per game.',
      'If the Healer heals a player that was attacked by wolves, the player survives.'
    ],
   
  }),
  herbalist: () => ({
    ...roles.villager(),
    roleName: 'Herborista',
    emoji: '🌿',
    weight: '6',
    notes: [
      'Eres un ayudante del CH',
      'Puedes envenenar a un jugador cada dos noches',
      'Puedes decidir quitar el veneno y asi salvar una vida',
    ],
  }),
  hunter: () => ({
    ...roles.villager(),
    roleName: 'Cazador',
    emoji: '👨‍🌾🎯',
    weight: '3.5',
    actions: {
        select: {
          times: 1,
          name:'Elige a un jugador.',
      },
    },
    notes: [
        "Eres el cazador de ciudad . No dueremes bien"
    ],
  }),
 lookout: () => ({
    ...roles.villager(),
    roleName: 'Vigía',
    emoji: '🔭',
    weight:5,
    actions: {
      watch: createAction({
          name:'watch player',
          execute: "get results",
          times:Infinity,
          }),
        },
    notes: ['Tu poder reside en observar durante la noche a un jugador y saber quienes lo visitan durante la noche', 'A quien quieres vigilar?',
    ],
  }),
  mason: () => ({
    ...roles.villager(),
    roleName: 'Mason',
    emoji: '👷',
    weight:
      'Si solo hay un albañil, entonces 1. Si hay más de un albañil en el juego, entonces (3 + número de albañiles).',
    notes: [
      'El mason es un miembro leal y confiable del pueblo. Conocido por su habilidad para construir relaciones sólidas y duraderas, el mason trabaja en equipo con sus compañeros masones para proteger al pueblo de las amenazas externas. Aunque no tiene habilidades especiales durante el día o la noche, su conocimiento de la identidad de los demás masons le permite coordinar estrategias y tomar decisiones informadas para el bien del pueblo',
      'Los Albañiles saben si algún jugador se convierte en Albañil.',
    ],
  }),
  mayor: () => ({
    ...roles.villager(),
    roleName: 'Alcalde',
    emoji: '🎖',
    weight: '4',
    actions:{
        reveal:{
          times:'1',
          name:"Revelar su rol a otros jugadores"
      }
    },
   notes:['Después de la revelación, el voto del alcalde comienza a contar como dos.']
  }),
 oracle :() =>({
   ...roles.villager(),
   roleName:'Oráculo',
   emoji:'🧿',
   weight:'5.5',
   actions:{
       oracle_vision:{
         times:Infinity,
         name:"Este player.id no es el rol de role().roleName"
     }
   },
   notes:['El Oráculo puede elegir a un jugador y saber quién NO es él.'+
   'El Oráculo muestra el rol de cualquier otro jugador vivo, excepto él mismo.',
   'El Oráculo solo muestra su propio rol en caso de que todos los jugadores restantes tengan el mismo rol.']
 }),
 pacifist :() =>({
   ...roles.villager(),
   roleName:'Pacifista',
   emoji:'☮',
   weight:'3',
   actions:{
       demonstrate:{
         times:'1',
         name:'Pacificar!'
     }
   },
   notes:['Puede llevar a cabo una demostración de pacifismo, cancelando así la próxima votación para la ejecución. Todos los jugadores saben quién es el pacifista después de la demostración.',]
 }),
 princess :() =>({
   ...roles.villager(),
   roleName:'Princesa',
   emoji:'💍',
   weight:'3.5',
   notes:[
     'Al intentar ejecutar a la princesa, los aldeanos conocerán el rol de la condenada y no ejecutarán a nadie.' +
     ' Esto solo funciona una vez.',
     'El Monarca puede ejecutar a la Princesa desde el primer intento.'
 ]
 }),
 sandman :() =>({
   ...roles.villager(),
   roleName:'Morpheus',
   emoji:'💤',
   weight:'8',
   actions:{
       sleep:{
         times:'1',
         name:'Puede hacer que todos se duerman, cancelando así todas las acciones de la próxima noche' 
     }
   },
   notes:['Revela su rol a otros jugadores.']
 }),
 seer :() =>({
   ...roles.villager(),
   roleName:'Vidente',
   emoji:'👳',
   weight:'6.5',
   actions:{
       vision:{
         times:Infinity,
     }
   },
   notes:[
     'Tanto el Vidente como el Tonto piensan que su rol es Vidente.',
     'Ve al Lycan como aldeano.',
     'Ve al Leñador como Lobo.',
     'Ve al lobo de cualquier tipo como Lobo normal.',
     'Ve al Traidor como Lobo (50%) o Campesino (50%).'
   ]
 }),
 traitor: () => ({
  ...roles.villager(),
  roleName: 'Traidor',
  emoji: '🖕',
  weight: '-5',
  notes: [
    'Solo puede salir si hay un lobo.',
    'Si no queda ningún lobo vivo, se convierte en lobo.',
    'El vidente lo ve como campesino (50%) o lobo (50%).',
  ],
}),
 wildChild :() =>({
   ...roles.villager(),
   roleName:'Niño salvaje',
   emoji:'👶',
   weight:'-1.5',
   actions:{
       choose:{
         times:'1',
         name:'Seleccionar modelo a seguir'
     }
   },
   notes:['Al comienzo del juego, elige a un jugador. Si muere, el niño salvaje se convierte en lobo.']
 }),
 wiseElder :() =>({
   ...roles.villager(),
   roleName:'Anciana sabia',
   emoji:'📚',
   weight:'5',
   actions:{
       choose:{
          times:'1'
     }
   },
   notes:['Elige a un jugador. Después del final del día, sabe si puede matar o no.']
 }),
 woodMan :() =>({
   ...roles.villager(),
   roleName:'Leñador',
   emoji:'🧔‍♂‍🌚',
   weight:'Si hay un vidente en el juego, entonces -1. En otros casos - 1.',
   notes:['El vidente ve al Leñador como Lobo.']
 }),
 
 wolf :() =>({
   roleName:'Lobo',
   emoji:'🐺',
   team:'Lobos',
   weight:'-8',
   actions:{
       attack:{
          times:Infinity,
          name:'Puede elegir a uno de los jugadores e intentar comérselo.',
     }
   },
   winCondition:'los lobos no son menos de la mitad de los jugadores vivos',
   notes:[
     'Si algún jugador se convierte en lobo, toda la manada lo sabrá.',
     'Si hay varios lobos, se lleva a cabo una votación para elegir a la víctima.',
     'Si hay un Alfa-Lobo en la manada, es él quien va a matar a la víctima. De lo contrario, el asesino es elegido al azar.'
 ]
 }),
 lycan :() =>({
   ...roles.wolf(),
   roleName:'Lycan',
   emoji:'🐺🌝',
   weight:'Si hay un vidente, entonces -10. Si no hay vidente, entonces -8.',
   notes:[
      'El vidente ve al Lycan como aldeano.',
      ...roles.wolf().notes || []
 ]
 }),
 alphaWolf :() =>({
   ...roles.wolf(),
   roleName:'Lobo alfa',
   emoji:'🐺⚡️',
   weight:'-11',
   description:'',
   
   notes:[
      `Eres el lobo alpha - ¡la fuente de todas las desgracias!`+
      'Por la noche puedes elegir a una persona y luego atacarla y matarla, pero mientras estés vivo, ' +
      'tus víctimas tienen un 25% de posibilidades de convertirse en lobos',
       ...roles.wolf().notes || []
 ]
 }),
 arabianWolf: () => ({
   ...roles.wolf(),
   roleName: 'Lobo árabe',
   emoji: '🐺🏜',
   weight: '-7',
   actions: {
       watch:{ 
          times: Infinity,
          name: 'Vigilar' },
       attack: {
          times: Infinity,
          name: 'Atacar' 
 },
 },
   notes: [
     'Contrario a lo que ocurre con otras especies de lobos, el árabe no aúlla ni vive en manada:es un lobo solitario del desierto que suele atacar a presas fáciles' +
     'Durante la noche puedes vigilar la casa de otro jugador ;sabrás si es lobo ,ó si tiene accion nocturna ó no.En caso de que ese jugador no tenga acción nocturna a partir de la próxima noche tendrás la opción de comértelo pero si lo haces no podrás vigilar a nadie esa noche.',
     'No es parte de la manada', 'Sólo podrá comerse objetivos previamente vigilados .',
     'Si es atacado por otros hombres lobo el ataque sería nulo y ambos jugadores serán notificados en sus respectivos PM con el bot que sois aliados.'
 ],
 }),
 blindWolf: () => ({
  ...roles.wolf(),
  roleName: 'Lobo ciego',
  emoji: '🐺👁‍🗨',
  weight: '1',
  notes: [
    'Tiene la habilidad de convertir a un jugador en un werewolf después de su muerte. Sin embargo, el Lobo ciego no sabe quiénes son sus compañeros werewolves, ya que es ciego. Si el Lobo ciego elige a un jugador que ya es un werewolf, ese jugador morirá. Si el Lobo ciego elige a un villager, ese jugador se convertirá en un werewolf.',
    ' La habilidad del Lobo ciego solo se puede usar una vez durante el juego, y solo después de su muerte.'
  ],
}),
 wolfClub: () => ({
  ...roles.wolf(),
  roleName: 'Wolf Club',
  emoji: '🐺🧒',
  weight: '3',
  notes: [
    'If all wolves die, the Wolf Club becomes a wolf.',
    'The Seer sees the Wolf Club as a villager.'
  ],
}),
 sorcerer: () => ({
   ...roles.wolf(),
   roleName: 'Hechicera',
   emoji:'🔮',
   weight: '-3',
   actions: {
        vision: {
           times: 2,
           name:'Puede saber el rol de cualquier jugador',
   },
 },
   notes: [
      'Ve al Aprendiz del vidente como Vidente con un 50% de posibilidades.',
 ],
}),
// 'Undead'
undead: () => ({
  roleName: 'Cómplice (un muerto viviente)',
  emoji:'🪦',
  team:'Undead',
  weight: '+1',
  actions: [],
  winCondition:'El numero total muertos vivientes mayor de la mitad de los jugadores vivos',
  notes: [
     'Eres un muerto viviente y has sido revivido desde el más allá para ayudar al líder en la oleada final para conquistar el mundo',
     'Tiene 25% de posibilidad de ser unido al culto. No puede ser asesinado por la asesina ni los lobos (no lo encontrarán en casa'
],
}),
leader: () => ({
  ...roles.undead(),
  roleName: 'Lider de los muertos vivientes',
  emoji:'🪦🌟',
  weight: '+5',
  actions: createAction({
    name:"Matar",
    execute: 'kill',
    times: Infinity,
    },
    {
      name:'Revivir',
      execute:'reborn',
      times:1    
    }
    ),
  notes: [
     'Amo ,y señor sobre la vida y la muerte :conductor de la batalla final entre el infierno y la aldea. Durante la noche podrás matar a un jugador sin embargo al decidir realizar tal acción implica que no podrás repetirla la próxima noche. Además 1 vez por partida en la noche que no matas podrás revivir a cualquier jugador(es) que hayas matado previamente para unirse a tu equipo como cómplice de tus fechorías',
     'Tiene 0% de posibilidad de ser unido al culto'+
     'No puede ser asesinado por la asesina ni los lobos(no lo encontrarán en casa.'+
     'Si ataca a un lobo o la asesina tiene 40% de matarlo ó salir huyendo.'+
     'Será percibido por la vidente como fantasma.'
],
}),

arsonist: () => ({
   roleName: 'Pirómano',
   emoji: '🔥',
   team: 'Incendiarios',
   weight: '-5',
   actions: {
       douse: {
         times: 2,
         name:'Puede empapar a un jugador con combustible o quemar a todos los jugadores empapados.',
   },
 },
   winCondition:
      'queda como el último sobreviviente o' +
      ' queda uno a uno con un rol incapaz de matarlo',
   notes: [
   'Aunque los incendiarios juegan en el mismo equipo, no conocen a otros incendiarios.',
 ],
}),
doppelganger: () => ({
   roleName: 'Doppelganger',
   emoji: '🎭',
   weight: '-1.5',
   actions: {
       copy: {
         times: 1,
         name:'Al comienzo del juego, elige a un jugador cuyo doble se convierte.',
   },
 },
   notes: [
   'Si el objetivo del doble muere, el doble cambia su rol al rol del objetivo.',
 ],
}),
undertaker :() =>({
   roleName:'Necromancer',
   emoji:'⚰',
   weight:'0.5',
   actions:{
       take:{
          times:'1'
  }
},
   notes:['Puede tomar para sí mismo el rol de un jugador ya fallecido.']
}),
serialKiller :() =>({ 
   roleName:'Asesino en serie',
   emoji:'🔪',
   weight:'-11',
   team:'Solo en equipo',
   actions:{
       kill:{
           times:'2',
           name:'Puedes elegir a uno de los jugadores e intentar matarlo.'
  }
},
   winCondition:'queda como único sobreviviente o queda uno a uno con otro jugador,' +
       ' si ese no es un Asesino en serie',
   notes:[
       'Si un lobo intenta matar al Asesino en serie, entonces el Asesino en serie lo matará.'
]
}),
snitch :() =>({
   ...roles.villager(),
   roleName:'Soplón',
   emoji:'🦜',
   weight:'0',
   actions:{
        reveal:{
           times:1,
           name:'Revelar rol de un jugador'

  }
},
   notes:['Eres un aldeano común' +'Puedes escoger un jugador para revelar su rol cuando seas lichado.']
}),
//
spy :() =>({
   ...roles.villager(),
   roleName:'Espía',  
   emoji:'🤵🏻‍♂',
   weight:'0',
   actions:{
       spying:{
         times:'1',
         name:'Investigar a jugadores'
  }
},
   notes:['Eres pro ,eres un espia' +'Una vez por partida puedes seleccionar 2 jugadores y saber si pertenecen al mismo equipo o no.'
+'En caso de que descubras que esos 2 jugadores son del mismo equipo (excepto aldea) automáticamente quedarás descubierto como espía y morirás.']
}),
survivor :() =>({
  roleName:'Superviviente',
  emoji:'👺',
  team:'Solo en equipo',
  weight:("jugadores totales" )/(-2),
  winCondition:'Sobrevivir vivo hasta el final del juego'
}),
//
suicide :() =>({
   roleName:'veterano',
   emoji:'👺',
   team:'Solo en equipo',
   weight:("jugadores totales" )/(-2),
   winCondition:'Ser linchado al final de la votación'
}),
puppetMaster :() =>({
   roleName:'Titiritero',
   emoji:'🕴',
   team:'Solo en equipo',
   weight:'-6',
   winCondition:'queda uno a uno con otro jugador o queda como único sobreviviente.',
   notes:[
       'El Titiritero no puede hacer que el jugador controlado se elija a sí mismo,' +
       ' pero puede hacer que un lobo se coma a otro lobo.',
       'Si el Titiritero eligió controlar a un lobo, entonces controlará toda la manada de lobos.' +
       ' En este caso, la manada será liderada por ese jugador elegido por el Titiritero.',
       'Si el Incendiario decide quemar a alguien, entonces el Titiritero no podrá detenerlo.',
       'Si el Titiritero eligió controlar a Cupido, entonces se le presentarán dos opciones.'
]
})
};

/*
martyr: () => ({
    ...roles.villager(),
    roleName: 'Mártir',
    emoji: '🕯',
    weight: '0',
    actions: {
        protect: {
          times: 1,
          name:
          'Al comienzo del juego, elige a un jugador.' +
          ' Si ese jugador está al borde de la muerte, entonces el Mártir lo salvará, pero morirá él mismo.',
      },
    },
    notes: [
      'Si el Mártir murió por su objetivo,' +
        ' solo puede ganar si gana el jugador que salvó.',
    ],
  }),


 thief: () => ({
   roleName: 'Ladrón',
   emoji: '😈',
   weight: '-4',
   actions: {
       steal: {
           times: 1,
           name:'Roba el rol de otro jugador. A cambio, el otro jugador se convierte en ladrón.',
     },
   },
   notes: [
     'No puede robar el rol del Doppelganger o de otro Ladrón.',
     'Si intenta robar el rol del Asesino en Serie, el Ladrón muere.',
     'Si intenta robar el rol del Vaquero, con una probabilidad del 50% el Ladrón muere.',
 ],
}),

*/
 /*
    sheriff: () => ({
      ...roles.villager(),
      roleName: 'Alguacil',
      emoji: '🤠',
      weight:4,
      actions: {
        jail: createAction({
            name:'texto 1',
            execute: "effect 1",
            times:Infinity,
            }),
          },
      notes: ['Eres la ley y el orden en el pueblo, dueno del saloon en el viejo oeste'],
    }),
    */