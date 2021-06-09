//
// How to build a REST API with Node js & Express
// https://www.youtube.com/watch?v=pKd0Rpw7O48
//
// https://dashboard.heroku.com/apps/millorem-el-tauli-be/deploy/github
//

const Joi = require('joi');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

let datajson = {
  "users": [
    {
      "id": 1,
      "user": "Anna Vila",
      "email": "anna.vila@tauli.cat",
      "password": "user@123",
      "department": "Laboratory",
      "type": "investigator/a"
    },
    {
      "id": 2,
      "user": "Ellen Smith",
      "email": "ellen.smith@tauli.cat",
      "password": "user@234",
      "department": "Radiology",
      "type": "investigator/a"
    },
    {
      "id": 3,
      "user": "Joan Fernández",
      "email": "joan.fernandez@tauli.cat",
      "password": "user@345",
      "department": "Oncology",
      "type": "investigator/a"
    },
    {
      "id": 4,
      "user": "Silvia Pou",
      "email": "silvia.pou@tauli.cat",
      "password": "admin@987",
      "department": "i3PT",
      "type": "personal i3pt"
    },
    {
      "id": 5,
      "user": "Mark Wilson",
      "email": "mark.wilson@tauli.cat",
      "password": "admin@987",
      "department": "i3PT",
      "type": "personal i3pt"
    }
  ],
  "problems": [
    {
      "id": 1,
      "owner": "anna.vila@tauli.cat",
      "title": "Baixa precisió en resultats d'exàmens laboratoris",
      "description": "La baixa qualitat o la poca curositat amb la que es realitzen els examens laboratoris ha provocat que un nombre prou alt de professionals ometin certes malalties com l'apendicitis, problemes cardíacs, neuronals, oncològics, etc.",
      "date": "Fri Apr 23 2021 11:25:46 GMT+0200 (CEST)",
      "likes": [
        "joan.fernandez@tauli.cat",
        "ellen.smith@tauli.cat"
      ],
      "status": "Sense tramitar",
      "i3ptOwner": "",
      "annexes": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "docName": "Adjunt d’una prova de laboratori",
          "docUrl": "http://www.tauli.cat/proves/doc1.doc",
          "docType": "doc"
        }
      ],
      "comments": [
        {
          "id": 1,
          "owner": "ellen.smith@tauli.cat",
          "description": "Et descuides de de la Baixa qualitat en imatges diagnòstiques!",
          "date": "Wed Apr 28 2021 09:12:15 GMT+0200 (CEST)"
        }
      ],
      "solutions": [
        {
          "id": 1,
          "owner": "ellen.smith@tauli.cat",
          "description": "El material d’anàlisis s’ha quedat enrere en el temps, és antic i cal renovar-lo! així s’evitarien molts problemes de diagnòstic…",
          "date": "Thu Apr 29 2021 11:53:09 GMT+0200 (CEST)"
        }
      ]
    },
    {
      "id": 2,
      "owner": "joan.fernandez@tauli.cat",
      "title": "Ús indegut de la demanda d'urgències",
      "description": "Crec que s'hauria de penalitzar el mal ús de la demanda. Les urgències estàn congestionades per un mal triatge. Necessitem idees per a campanyes de sensibilització i educació de la població en l'ús adequat de la urgència o alternatives per a fer-hi front.",
      "date": "Mon Apr 26 2021 17:40:10 GMT+0200 (CEST)",
      "likes": [
        "silvia.pou@tauli.cat"
      ],
      "status": "Acceptada",
      "i3ptOwner": "silvia.pou@tauli.cat",
      "annexes": [],
      "comments": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "description": "Els serveis d'urgència han d'atendre totes les urgències, fins i tot en horari d'atenció continuada i que el personal d'atenció primària s'ha de dedicar a atendre les consultes en centre i domicilis programats.",
          "date": "Wed Apr 28 2021 10:52:19 GMT+0200 (CEST)"
        },
        {
          "id": 2,
          "owner": "ellen.smith@tauli.cat",
          "description": "Opino que l'atenció primària ha d'atendre totes les necessitats de la població i l'atenció continuada i les urgències són part d'ella... no crec que se n'estigui fent un mal ús però potser sí que s'hauria de millorar-ne la gestió.",
          "date": "Wed Apr 28 2021 10:52:19 GMT+0200 (CEST)"
        }
      ],
      "solutions": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "description": "S'hauria de crear una taula rodona entre professionals d'urgències per analitzar les necessitats reals  en comú  i recollir les seves propostes per a valorar si la opinió és compartida.",
          "date": "Mon Apr 26 2021 17:52:21 GMT+0200 (CEST)"
        }
      ]
    },
    {
      "id": 3,
      "owner": "anna.vila@tauli.cat",
      "title": "Exclusions en la universalització i l’accés a la salut pública",
      "description": "La mala maror que ha generat aquesta instrucció &quot;La instrucció assenyala les migrants com a defraudadores del sistema &quot;, Marea Blanca ha fet que el Departament de Salut se’n replantegés la redacció. “La consellera ha dit en seu parlamentària que, si algun apartat pot donar lloc a una interpretació racista, es canviarà”, recorda Ramentol, que destaca que la voluntat del Govern és que “totes les persones que viuen a Catalunya tinguin garantit l’accés a la sanitat pública, no que es produeixin limitacions”. “Una altra cosa és que també hàgim de perseguir una realitat que existeix: el turisme sanitari”, matisa.  “A Catalunya s’havia aconseguit que, des del moment del padró, s’accedís a l’assistència sanitària. Ara retrocedim, no via padró, però si per l’arrelament”, comenta. Així mateix, la Plataforma posa l’accent en el fet que el decret estableixi que les dones embarassades que no tinguin targeta sanitària “hauran d’acreditar que pateixen una situació d’exclusió davant les treballadores socials dels centres sanitaris si volen ser ateses”. “I només les atenen en qüestions relatives al seu embaràs”, exposa Martínez, que hi afegeix que els menors que no es considerin en alt risc de marginació social i que no estiguin tutelats per organismes d’atenció a la infància i l’adolescència, també quedaran fora de la cobertura sanitària si no tenen la targeta. A més, l’activista recorda que, si fins ara les persones que no estaven empadronades a Catalunya tenien dret a rebre assistència d’urgència si signaven la ‘declaració responsable’, amb el Projecte de decret “es considera que les que tinguin uns ingressos per sobre de la renda de suficiència de Catalunya (538 euros mensuals), i que no estiguin empadronades o no hagin acreditat l’arrelament, podran fer front a les despeses de l’assistència sanitària”. En el cas de l’Hospital Clínic, explica Martínez, l’assistència d’urgència bàsica costa aproximadament 230 euros.",
      "date": "Tue Apr 27 2021 12:16:50 GMT+0200 (CEST)",
      "likes": [
        "ellen.smith@tauli.cat",
        "joan.fernandez@tauli.cat",
        "silvia.pou@tauli.cat"
      ],
      "status": "¡Solucionat!",
      "i3ptOwner": "silvia.pou@tauli.cat",
      "annexes": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "docName": "Informe dades Laboratori",
          "docUrl": "http://www.tauli.cat/proves/doc1.pdf",
          "docType": "pdf"
        }
      ],
      "comments": [
        {
          "id": 1,
          "owner": "joan.fernandez@tauli.cat",
          "description": "La Plataforma per una Atenció Sanitària Universal ha documentat 400 casos d’exclusió sanitària entre el 2012 i el 2018!!!!",
          "date": "Thu Apr 29 2021 17:52:19 GMT+0200 (CEST)"
        }
      ],
      "solutions": [
        {
          "id": 1,
          "owner": "ellen.smith@tauli.cat",
          "description": "Esmento una notícia pel que fa al conflicte: &quot;el director del CatSalut, Adrià Comella, va signar una resolució en què suspenia l’aplicació de la Instrucció 5/2019, que els col·lectius en defensa de la sanitat pública denunciaven a CRÍTIC. La resolució argumenta que la finalitat de la suspensió és garantir la sostenibilitat del sistema sanitari públic, del CatSalut, fins a l’aprovació del corresponent Decret pel qual s’aprovi el reglament de desenvolupament de la Llei 9/2017, que estableix la universalització de l’assistència sanitària amb càrrec a fons públics per mitjà del Servei Català de la Salut i, en el seu cas, es revisi el contingut de la Instrucció en els termes que escaigui &quot;.",
          "date": "Fri Apr 30 2021 19:02:11 GMT+0200 (CEST)"
        }
      ]
    }
  ]
};
// GET ----------
app.get('/api', (req, res) => {
  res.status(200).json(datajson)
})
app.get('/api/users', (req, res) => {
  res.status(200).json(datajson.users)
})
app.get('/api/users/:id', (req, res) => {
  const user = datajson.users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).send('The user with given ID was not found');
  res.status(200).json(user)
})
app.get('/api/problems', (req, res) => {
  res.status(200).json(datajson.problems)
})
app.get('/api/problems/:id', (req, res) => {
  const problem = datajson.problems.find(p => p.id === parseInt(req.params.id))
  if (!problem) return res.status(404).send('The problem with given ID was not found');
  res.status(200).json(problem)
})

// POST ---------
app.post('/api/users', (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const latestId = datajson.users[datajson.users.length - 1].id
  const user = {
    id: latestId + 1,
    user: req.body.user,
    email: req.body.email,
    password: req.body.password,
    department: req.body.department,
    type: req.body.type,
  }
  datajson.users.push(user);
  //res.status(200).json(datajson.users)
  res.send(user);
})

app.post('/api/problems', (req, res) => {
  const { error } = validateProblem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const latestId = datajson.problems[datajson.problems.length - 1].id
  const problem = {
    id: latestId + 1,
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    likes: req.body.likes || [],
    status: req.body.status || "Sense tramitar",
    i3ptOwner: req.body.i3ptOwner || "",
    annexes: req.body.annexes || [],
    comments: req.body.comments || [],
    solutions: req.body.solutions || []
  }
  datajson.problems.push(problem);
  //res.status(200).json(datajson.problems)
  res.send(datajson.problems);
})

// PUT ----------
app.put('/api/users/:id', (req, res) => {
  let user = datajson.users.find(u => u.id === parseInt(req.params.id))
  if (!user) return res.status(404).send(`The user with given ID ${req.params.id} was not found`);

  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.user = req.body.user;
  user.email = req.body.email;
  user.password = req.body.password;
  user.department = req.body.department;
  user.type = req.body.type;

  res.send(user);
})

app.put('/api/problems', (req, res) => {

  datajson.problems = req.body;

  res.send(datajson.problems);
})

app.put('/api/problems/:id', (req, res) => {
  let problem = datajson.problems.find(u => u.id === parseInt(req.params.id))
  if (!problem) return res.status(404).send(`The problem with given ID ${req.params.id} was not found`);

  const { error } = validateProblem(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  problem = req.body;
  datajson.problems.forEach((probl, index) => {
    if (probl.id === parseInt(req.params.id)) datajson.problems[index] = problem;
  });

  res.send(problem);
})

// -----------------------
// start server ----------
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}...`));


// Tools -----------------
// ValidateUser fn() ---------
function validateUser(user) {
  const schema = Joi.object({
    id: Joi.number(),
    user: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    department: Joi.string().min(3).required(),
    type: Joi.string().min(3).required()
  });

  return schema.validate(user);
}

// ValidateProblem fn() ---------
function validateProblem(problem) {
  const schema = Joi.object({
    id: Joi.number(),
    owner: Joi.string().email().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
    date: Joi.string().required(),
    likes: Joi.array().items(
      Joi.string().email()
    ),
    status: Joi.string(),
    i3ptOwner: Joi.string().empty(""),
    annexes: Joi.array().items(
      Joi.object({
        id: Joi.number(),
        owner: Joi.string().email(),
        docName: Joi.string(),
        docUrl: Joi.string(),
        docType: Joi.string()
      })
    ),
    comments: Joi.array().items(
      Joi.object({
        id: Joi.number(),
        owner: Joi.string().email(),
        description: Joi.string(),
        date: Joi.string()
      })
    ),
    solutions: Joi.array().items(
      Joi.object({
        id: Joi.number(),
        owner: Joi.string().email(),
        description: Joi.string(),
        date: Joi.string()
      })
    )
  });

  return schema.validate(problem);
}
