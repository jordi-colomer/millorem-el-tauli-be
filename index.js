//
// How to build a REST API with Node js & Express
// https://www.youtube.com/watch?v=pKd0Rpw7O48
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
      "title": "When Forty Winters Shall Besiege Thy Brow",
      "description": "When forty winters have attacked your brow and wrinkled your beautiful skin, the pride and impressiveness of your youth, so much admired by everyone now, will have become a worthless, tattered weed. Then, when you are asked where your beauty’s gone and what’s happened to all the treasures you had during your youth, you will have to say only within your own eyes, now sunk deep in their sockets, where there is only a shameful confession of greed and self-obsession. How much more praise you would have deserved if you could have answered, ‘This beautiful child of mine shall give an account of my life and show that I made no misuse of my time on earth,’ proving that his beauty, because he is your son, was once yours! This child would be new-made when you are old and you would see your own blood warm when you are cold.<br><br>But why don’t you use a more effective way of fighting this terrible tyrant, Time? And defend yourself with more effective methods than my useless poems? You are right at the peak of your life, and many maiden gardens, still unplanted, would love to bear you fresh young flowers much more like you than your portrait is. So your children, whose existence ensures your continuance, can give you perpetual life, something which neither Time’s paintbrush nor my poor pen can do. By giving yourself away you will preserve yourself, and so you will live, yourself being the artist who paints you.",
      "date": "Fri Apr 23 2021 11:25:46 GMT+0200 (CEST)",
      "likes": [
        "joan.fernandez@tauli.cat",
        "ellen.smith@tauli.cat"
      ],
      "status": "Sense tramitar",
      "i3ptOwner": "",
      "annexes": [],
      "comments": [
        {
          "id": 1,
          "owner": "ellen.smith@tauli.cat",
          "description": "Wasteful youth, why do you squander on yourself the riches that you should leave to the world? Nature gives nothing but only makes a loan and, being generous, she lends only to those who are open-hearted. Then, beautiful miser, why do you abuse the generous inheritance given to you to leave to someone else? Unsuccessful money-lender, why do you spend such great sums when you can’t live forever, by thinking of yourself only? You are only cheating yourself, so, when nature calls you away what reasonable account will you be able to give of yourself? Your unused seed will have to be buried with you, which, if used, would live as the administrator of your beauty.",
          "date": "Wed Apr 28 2021 09:12:15 GMT+0200 (CEST)"
        }
      ],
      "solutions": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "description": "Time, that so carefully made those beautiful eyes that every other eye gazes at, will become a tyrant to those same lovely eyes and make them ugly; because never-resting time leads summer into hideous winter and destroys it there. Sap is stopped from rising by the frost and the leaves disappear; beauty is covered with snow and all the trees are bare. Then, if summer’s distillation hadn’t been preserved as a prisoner in a glass vial, that summer’s legacy would be lost with that summer’s death. Neither it nor the memory of what it was would remain. But flowers that have been distilled, even though they’ve been destroyed by winter, lose only their outward appearance: their substance lives on sweetly.",
          "date": "Fri Apr 23 2021 12:48:05 GMT+0200 (CEST)"
        },
        {
          "id": 2,
          "owner": "ellen.smith@tauli.cat",
          "description": "So don’t let winter’s ragged hand disfigure that summer in you before your essence is distilled. Fill some vial; enrich some woman’s womb with the treasure of your beauty before it dies. The interest from that would not be illegal lending if it made the willing borrower happy, which would happen if the loan was to breed another of yourself. Or ten times better if the interest were ten for one. Ten of yourself would be better than just one of you, with ten of your children existing, making ten images of you. Then what effect could death have if you should die, leaving you alive after your death? Don’t be obstinate because you are far too beautiful to be the victim of death and have only worms as your heirs.",
          "date": "Thu Apr 29 2021 11:53:09 GMT+0200 (CEST)"
        }
      ]
    },
    {
      "id": 2,
      "owner": "anna.vila@tauli.cat",
      "title": "Look In Thy Glass, And Tell The Face Thous Viewest",
      "description": "Look in your mirror and tell the face you see that it’s time it should create another If you do not renew yourself you would be depriving the world, and stop some woman from becoming a mother. For where is the lovely woman whose unploughed womb would not appreciate the way you plow your field? Or who is he foolish enough to love himself so much as to neglect reproducing? You are the mirror of your mother, and she is the mirror of you, and in you, she recalls the lovely April of her youth. In the same way, you will see your youth in your own children, in spite of the wrinkles caused by age. But if you live your life avoiding being remembered you will die single and your image will die with you.<br><br>Who will believe my poem in times to come if it were filled with your great qualities? Heaven knows that it’s only like a grave that conceals your qualities, and doesn’t even show half your talents. Even if I had the ability to describe the beauty of your eyes, and write good lines that would enumerate all your gracious qualities, those who read it in the future would say ‘This poet is telling lies: no human face has ever possessed such heavenly beauty,’ so, my pages, yellowed with age, would be scorned like old men who talk nonsense, and the right that you have to such praise would be dismissed as a poet’s exaggeration – the elaborate metre of old-fashioned poems. But if there were a child of yours alive at that time, you would be doubly alive – in the child and in my poem.<br><br>Devouring Time, you may make the lion’s claws blunt and return all creatures to the earth from which they sprang; pull the teeth from the fierce tiger’s jaws, and destroy the phoenix in her fire. Do whatever you like, fast-running Time, to any beautiful fading thing in the world; but I forbid you to commit one heinous crime: oh don’t cut into my love’s beautiful brow, nor draw wrinkles there with your insane pen. As you go on your destructive course spare him as a pattern of beauty for posterity. But, do your worst, old Time. Whatever harm you do my love will remain young forever in my poetry.",
      "date": "Mon Apr 26 2021 17:40:10 GMT+0200 (CEST)",
      "likes": [
        "silvia.pou@tauli.cat"
      ],
      "status": "¡Solucionat!",
      "i3ptOwner": "silvia.pou@tauli.cat",
      "annexes": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "docName": "Estructura i pautes en les analitiques",
          "docUrl": "http://www.tauli.cat/proves/doc2.doc",
          "docType": "doc"
        },
        {
          "id": 2,
          "owner": "anna.vila@tauli.cat",
          "docName": "Organigrama",
          "docUrl": "http://www.tauli.cat/proves/doc2.pdf",
          "docType": "pdf"
        }
      ],
      "comments": [
        {
          "id": 1,
          "owner": "ellen.smith@tauli.cat",
          "description": "Look! In the east when the glorious sun raises his burning head, all men’s eyes pay tribute to his new, fresh appearance, serving his majesty with looks of awe. And having climbed that steep hill to heaven like a strong youth in the prime of life, mortals still worship his beauty as they watch his golden climb into the sky. But when he staggers away, old and feeble, from his highest point with weary horses, the eyes that were dutiful before, now turn away from him and look elsewhere. So you, yourself, declining from your noonday glory, will die disregarded, unless you beget a son.",
          "date": "Wed Apr 28 2021 10:52:19 GMT+0200 (CEST)"
        }
      ],
      "solutions": [
        {
          "id": 1,
          "owner": "anna.vila@tauli.cat",
          "description": "Why do you, who are music to listen to, listen to music sadly? Sweet things don’t quarrel with sweet things, and joyful things delight in joyful things. Why do you love something that you don’t enjoy, or get pleasure from something that causes you pain? If the true harmony of well-tuned sounds, married to each other in counterpoint, offends your ear, it is gently reprimanding you because by staying single you are denying the part you should play. Remember that one string reverberates with the others to produce rich music, like father and child and happy mother in a family, who all sing together in pleasing harmony. Their instrumental performance is a unity, although made up of many parts, and make this point, in music, to you: ‘Being single you will be nothing.’",
          "date": "Mon Apr 26 2021 17:52:21 GMT+0200 (CEST)"
        }
      ]
    },
    {
      "id": 3,
      "owner": "joan.fernandez@tauli.cat",
      "title": "From Fairest Creatures We Desire Increase",
      "description": "We want all beautiful creatures to reproduce themselves so that beauty’s flower will not die out; but as an old man dies in time, he leaves a young heir to carry on his memory. But you, concerned only with your own beautiful eyes, feed the bright light of life with self-regarding fuel, making beauty shallow by your preoccupation with your looks. In this you are your own enemy, being cruel to yourself. You who are the world’s most beautiful ornament and the chief messenger of spring, are burying your gifts within yourself And, dear selfish one, because you decline to reproduce, you are actually wasting that beauty. Take pity on the world or else be the glutton who devours, with the grave, what belongs to the world.<br><br>Shall I compare you to a summer’s day? You are more lovely and more moderate: Harsh winds disturb the delicate buds of May, and summer doesn’t last long enough. Sometimes the sun is too hot, and its golden face is often dimmed by clouds. All beautiful things eventually become less beautiful, either by the experiences of life or by the passing of time. But your eternal beauty won’t fade, nor lose any of its quality. And you will never die, as you will live on in my enduring poetry. As long as there are people still alive to read poems this sonnet will live, and you will live in it.",
      "date": "Tue Apr 27 2021 12:16:50 GMT+0200 (CEST)",
      "likes": [
        "ellen.smith@tauli.cat",
        "joan.fernandez@tauli.cat",
        "silvia.pou@tauli.cat"
      ],
      "status": "Acceptada",
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
          "owner": "anna.vila@tauli.cat",
          "description": "Is it because you fear to make a widow grieve, that you waste yourself in bachelorhood? Ah, if you should happen to die childless the world will mourn for you like a bereaved widow. The world will be your widow and weep profusely because you have left no copy of yourself behind, while an ordinary widow is able to keep her husband’s memory fresh by looking at her children. Whatever a money-waster spends just moves from one pocket to another and the world continues to enjoy it, but squandered beauty is lost to the world, and by not using it the user destroys it. There is no love for others in the heart of one who murders himself so shamelessly.",
          "date": "Thu Apr 29 2021 17:52:19 GMT+0200 (CEST)"
        },
        {
          "id": 2,
          "owner": "ellen.smith@tauli.cat",
          "description": "Out of a sense of shame you, who are so unwilling to provide for the future, should admit that you don’t love anyone. I grant you, if you like, that you are loved by many, but it’s very clear that you don’t love anyone; because, being someone who doesn’t hesitate to conspire against himself, you are determined to murder your potential progeny. You are prepared to end your noble line, which it should be your main concern to maintain. Oh! Change your mind, so that I can change my opinion of you. Do you, the most beautiful creature, want to be the house where hate lives? Be as gracious and generous to your relatives as you are to everyone else, or at least be generous to yourself. Change your mind for my sake so that you will be a noble person and that your beauty will live on in your descendants.",
          "date": "Wed Apr 28 2021 18:50:39 GMT+0200 (CEST)"
        }
      ],
      "solutions": [
        {
          "id": 1,
          "owner": "joan.fernandez@tauli.cat",
          "description": "When I count the chimes of the clock and watch the bright day sunken into terrifying night; when I see violets fading, and black curls all silvered over with white; when I see tall trees which previously offered shade to sheep and cattle but now with no leaves; and the green crops of summer tied up in harvested sheaves covered with scratchy dried out leaves, carried away on a wagon; then I begin to think about the endurance of your beauty and that you will have to decline and decay like everything else because sweet and beautiful things lose their sweetness and beauty and die while watching new sweet and beautiful things taking their place. The only defense against Time’s scythe is to defy him when he takes you away, by having children.",
          "date": "Fri Apr 30 2021 19:02:11 GMT+0200 (CEST)"
        },
        {
          "id": 2,
          "owner": "ellen.smith@tauli.cat",
          "description": "I don’t pick my wisdom from the stars, but I think I understand astronomy, although not to predict good or bad luck, or plagues and famines or what the seasons will be like. Nor can I tell fortunes, showing individuals their own moods and their ups and downs, nor tell rulers whether things will go well by frequent predictions from what I see in the heavens. But I get my knowledge from your eyes, and as they are constant stars, I’m able to predict that truth and beauty will thrive together if you would turn your attention from yourself to the reproduction of yourself; otherwise, this is my prediction for you: your death will be the final end of truth and beauty.",
          "date": "Wed Apr 28 2021 10:02:19 GMT+0200 (CEST)"
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
  //if (error) return res.status(400).send(error.details[0].message);
  if (error) return res.status(400).send(error);

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