import { t } from 'i18next';
import {Drill} from '../../types/Drill';

export const drills: Drill[] = [
  {
    title: 'Dribble routine',
    duration: 5,
    description: 'Improves your dribbling skills',
    videoUrl: 'https://youtu.be/CLoWxOvlHkk',
    instructions: 'Get in a good stance, keep your head up, and make sure you also work on your weak hand.',
    workoutSteps: [
      { time:'0:52' , title: 'Pound dribble',description:'20 ankle height, 20 knee height, 20 waist height, 20 shoulder height',type:'none'},
      { time:'2:12' , title: 'Figure 8',description:'Pass the ball around your legs',type:'none'},
      { time:'2:39' , title: 'V-dribble',description:'Dribble right and left like a windshield wiper',type:'none'},
      { time:'3:13' , title: 'In and out',description:'Fake the crossover then bring the ball back to the same hand',type:'none'},
      { time:'3:51' , title: 'Between the legs',description:'Dribble the ball between your legs',type:'none'},
      { time:'4:52' , title: 'Behind the back',description:'Dribble the ball behind your back',type:'none'}
    ],
    tags: ['dribbling' ,'Workouts','beginner','intermediate', 'Ball handling']
  },
  {
    title: 'Tim hardaway teaches his Killer Crossover',
    duration: 2,
    description: 'Beat defenders with a quick change of direction.',
    videoUrl: 'https://www.youtube.com/watch?v=CfuqG37Fd2Y',
    instructions: 'Learn Tim Hardaway\'s signature move.',
    tips: [
      'First you need to be able to make a left hand layup, read the defender if he\'s not shifting, go for the left hand layup.',
      'Dribble between the leg, if the defender shifts crossover back to your right hand .',
      'The secret is getting low and staying low during the dribble.',
      'This allows you to maintain control of the ball and change direction quickly.'
    ],
    tags: ['Ball handling', 'advanced','signature move','nba', 'Learning moves']
  },
 
  {
    title: 'Layups',
    duration: 3,
    description: 'Learn overhand layups and underhand layups.',
    videoUrl: 'https://youtu.be/r7OGMVmkNb0',
    instructions: 'Dribble towards the rim, grab the ball with both hands, step with your right foot, then left foot, and finish with your right hand.',
    tips: [
      'Overhand: Keep basketball in front, Keep it high enough',
      'Take on dribble from the 3 point line, make two steps take off from the block and finish using square off the backboard.',
      'Underhand: Extend your arm and finish with a scoop to the basket.',
      'Useful when you have a defender on your back.',
    ],
    tags: ['layups', 'beginner', 'Finishing']
  },
  {
    title: 'Floaters',
    duration: 2,
    description: 'Improves your ability to finish over defenders.',
    instructions: 'Dribble towards the rim, jump off two feet and finish with a floating shot.',
    tips: [
      'Go slowly, the feel is more important than speed.',
      'Focus on balance, it is the key to a good floater.',
      'Start with small floaters and gradually increase the distance.'
    ],
    videoUrl: 'https://youtu.be/m2XrJ2aUnSw',
    tags: ['layups', 'intermediate', 'Finishing','Learning moves']
  },
  {
    title: 'Euro Step',
    duration: 3,
    description: 'Improves your ability to go to the basket especially for smaller guards.',
    videoUrl: 'https://www.youtube.com/watch?v=MDbS4QF71Iw',
    instructions: 'Dribble towards the rim, grab the ball with both hands, step with your right foot, then left foot, and finish with either hand.',
    tips: [
      'Step away from the defender.',
      'Step and turn shoulders.',
      'Take off from the opposite foot.',
      'Practice finishing with both hands.'
    ],
    tags: ['layups', 'beginner', 'Finishing','Learning moves']
  },
  {
    title: 'Form Shots',
    duration: 5 ,
    description: 'Improves your shooting form.',
    instructions: 'Shoot the ball with one hand from 5 spots. Add the second hand to guide the shot and take 5 more shots. Step into the shot and take 5 more shots.',
    workoutSteps: [
      { time:'0:15' , title: 'One hand shots',description:'Make 5 switch from 5 spots',type:'none'},
      { time:'0:26' , title: 'Add the guide hand',description:'Same but this time add the other to guide the shot',type:'none'},
      { time:'0:36' , title: 'Step into the shot',description:'Use your legs to generate power',type:'none'}
    ],
    videoUrl: 'https://youtu.be/wzY4SVCzF7Y',
    tags: ['Shooting', 'beginner']
  },
  {
    title: 'Pound Shots',
    duration: 3,
    description: 'Improves the transition to shooting.',
    instructions: 'Stand 3-4m from the basket, pound the ball hard with your weak hand before shooting.',
    tips: [
      'Step 1: Dribble hard.',
      'Step 2: Catch the ball with your weak hand and stuff if into your strong hand.',
      'Step 3: Place the ball in your "shooting pocket" and shoot.'
    ],
    videoUrl: 'https://youtu.be/FF8i7_cEABY',
    tags: ['Shooting', 'intermediate']
  },
  {
    title: 'One Dribble Pull-ups',
    duration: 2,
    description: 'Improves your shot after a dribble.',
    instructions: 'Dribble towards the basket, take one dribble, then shoot.',
    workoutSteps: [
      { time:'0:05' , title: 'Footwork',description:'Work on your footwork',type:'none'},
      { time:'0:52' , title: 'Stabilize',description:'Pause and stabilize before shooting',type:'none'},
      { time:'1:37' , title: 'No pause',description:'Repeat the movement but without pausing',type:'none'},
      { time:'2:16' , title: 'Load,load shot',description:'Dribble quickly, pause, dribble again, stop',type:'none'}
    ],
    videoUrl: 'https://youtu.be/nVG_1LYgPAY',
    tags: ['Shooting', 'intermediate','Workouts']
  },
  {
    title: 'Curry\'s Fast Shot release',
    duration: 2,
    description: 'Improve how fast you can shoot off the catch.',
    instructions: 'Catch the ball and shoot with a fast release',
    tips: [
      'Avoid any extra movement before shooting.',
      'Catch the ball in a shooting stance.',
      'Shoot in on fluid motion.'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=m0Tvpyjae_E',
    tags: ['Shooting', 'advanced','Learning moves']
  },
  {
    title: 'Defensive Stance drill',
    duration: 3,
    description: 'Improves your defensive stance.',
    instructions: 'Get in a low stance, get low, keep your chest up and your butt down.',
    tips: [
      'Step 1: Start low put the basketball on the ground',
      'Step 2: Slide from side to side while staying attached to the ball',
      'Step 3: Keep your other hand up and active',
    ],
    videoUrl: 'https://youtu.be/0UasgLL2raY',
    tags: ['defense', 'beginner', 'Learning moves']
  },
  {
    title:'Behind the back pass',
    duration: 3,
    description: 'Improves your passing skills.',
    instructions: 'Make direct and bounce passes behind your back.',
    tips: [
      'To practice alone, get close to a wall and make behind the back passes to yourself.',
      'Make sure the pass is accurate, it should be easy to catch.',
      'As you improve you can increase the distance and speed of the pass.'
    ],
    videoUrl: 'https://youtu.be/CvGyckNQo0o',
    tags: ['passing', 'beginner', 'Ball handling'] 
  },
  {
    title: 'Find YOUR shooting pocket',
    duration: 5,
    description: 'Tutorial on how to find your shooting pocket.',
    instructions: 'The shooting pocket is the area where you feel most comfortable starting your shot. This video shows how to find the best position for you.',
    videoUrl: 'https://youtu.be/1PMN23U_lXs',
    tags  : ['Shooting', 'intermediate']
  },
  {
    title: 'Michael Jordan masterclass',
    duration: 50,
    description: 'Learn the fundamentals of basketball from the greatest player of all time.',
    videoUrl:'https://youtu.be/ZKZtzwinLFw',
    instructions: 'Watch the video and take notes on the key points.',
    tags: ['fundamentals', 'beginner','lessons','masterclass','nba', 'Masterclass'],
    timestamps: [
      { time: '0:09', label: 'Offense - Introduction' },
      { time: '1:30', label: 'How to attack the defender\'s stance' },
      { time: '8:48', label: 'The Fade Away' },
      { time: '14:15', label: 'Free Throws' },
      { time: '23:02', label: 'Using the screen / Moving without the ball' },
      { time: '25:30', label: 'Passing to the post' },
      { time: '28:20', label: 'Defense - Introduction' },
      { time: '29:06', label: 'Defensive stance' },
      { time: '31:49', label: 'Team Defense - One pass away, two passes away' },
      { time: '33:25', label: 'Seeing your man' },
      { time: '34:58', label: 'Movement' },
      { time: '38:49', label: 'Q&A' },
    ],

  },
  {
    title:'Magic Johnson masterclass ( features Jabbar, Smith, Hamilton and McKnight)',
    duration: 90,
    description: 'Learn the fundamentals of basketball from one of the best point guards that ever played the game.',
    videoUrl:'https://youtu.be/FrjAwZGUaXw',
    instructions: 'Watch the video and take notes on the key points.',
    tags: ['fundamentals', 'beginner','lessons','masterclass','nba', 'Masterclass']
  },
  {
    title : 'Kyrie Irving teaching fundamentals',
    duration: 5,
    description: 'Learn the fundamentals of basketball from one of the best ball handlers in the game.',
    videoUrl: 'https://youtu.be/cpaK9KyyRZ8',
    instructions: 'Watch the video and enjoy :)',
    tags: ['fundamentals', 'beginner','lessons','masterclass','nba', 'Masterclass'],
  },
  {
    title:'Kyrie Irving teaching moves and footwork',
    duration: 5,
    description: 'Learn advanced moves and footwork from Kyrie Irving.',
    videoUrl: 'https://youtu.be/56-GZOdqiP4',
    instructions: 'Watch the video and learn from one of the best ball handlers in the game.',
    timestamps  : [
      { time: '0:12', label: 'Kyrie coaches a younger player' },
      { time: '1:25', label: 'Kyrie breaks down how to attack after splittling the scren' },
      { time: '3:28', label: 'Thoughts on what is a great ball handler' },
    ],
    tags: ['advanced','lessons','masterclass','nba', 'Learning moves']
  },
  {
    title: 'Strength exercices',
    duration: 10,
    description: 'Full body workout to improve your strength',
    instructions:'5 exercices to improve your strength',
    workoutSteps: [
      { time:'1:40' , title: 'Kettlebell deadlift',description:'3 sets of 10 reps',type:'weights'},
      { time:'2:52' , title: 'Gobelet squat',description:'3 sets of 10 reps',type:'weights'},
      { time:'3:50' , title: 'Kettlebell row',description:'3 sets of 10 reps',type:'weights'},
      { time:'4:46' , title: 'Pushups',description:'3 sets',type:'reps'},
      { time:'6:15' , title: 'Planks',description:'Hold the plank as long as you can',type:'time'}
    ],
    videoUrl: 'https://youtu.be/53gdhc6ZHYM',
    tags: ['Workouts', 'Strength & conditionning', 'Strength&stamina']
  },
  {
    title:'Stamina workout',
    duration: 15,
    description: 'Improve your stamina with this workout',
    instructions: '5 exercices to improve your stamina',
    workoutSteps: [
      { title:'17\'s', description:'Run from one sideline to the other 17 times', type:'time', time:'0:22'},
      { title:'Block to block', description:'Run from one block to the other in a defensive stance as many times as possible in 30 sec', type:'reps',countdown:30,time:'0:46'},
      { title:'Double down and back - 22s', description:'Run from one baseline to the other two times', type:'time', time:'1:15'},
      { title:'Sprint and backpedal', description:'Sprint to the other end, then backpedal, do it 3 times', type:'time', time:'1:38'},
      { title:'Walk, jog and sprint', description:'Walk, jog and sprint', type:'time',time:'2:13'},
    ],    
    videoUrl: 'https://youtu.be/b7rr3IfRcyo',
    tags: ['Workouts', 'stamina','Strength & conditionning', 'Strength&stamina']
  },
  
  {
    title: 'Scottie Barnes full workout',
    duration: 60,
    description: 'Full workout routine from Scottie Barnes',
    workoutSteps: [
      { time:'1:06' , title: 'Dumbbel single leg squat',description:'3x15',type:'weights'},
      { time:'1:12' , title: 'Split jump',description:'3x6',type:'none'},
      { time:'1:21' , title: 'Later raises',description:'3x10',type:'weights'},
      { time:'1:40' , title: 'Pullups',description:'until failure',type:'reps'},
      { time:'1:48' , title: 'Single leg RDL',description:'3x5',type:'weights'},
      { time:'1:56' , title: 'Curls',description:'3 till failure',type:'reps'},
      { time:'2:56' , title: '5 min ball handling warmup',description:'',type:'none',countdown:300},
      { time:'3:15' , title: 'Combos to the the basket',description:'',type:'reps'},
      { time:'3:41' , title: 'Combos to pullup, counter moves',description:'',type:'reps'},
      { time:'4:16' , title: 'Attack paint to fadeaway',description:'useful when switched to a smaller defender',type:'reps'},
      { time:'4:39' , title: 'Hesi-Pull up midrange',description:'',type:'reps'},
      { time:'4:59' , title: 'Hesi-Pull up to 3, finish with a counter to the basket',description:'',type:'reps'},
      { time:'5:07' , title: 'Side step 3s',description:'',type:'reps'},
      { time:'5:25' , title: "Catch & shoot 3's, top of the key, wing, free throws",description:'',type:'reps'},
      { time:'6:22' , title: "Catch & shoot from the low block",description:'',type:'reps'}
    ],
    videoUrl:'https://youtu.be/rhIXk-fvbFo',
    tags: ['workout', 'advanced','nba', 'Workouts']
  },
  {
    title: 'Learn Allen Iverson\'s crossover with coach Drew Hanlen',
    duration: 4,
    description: 'Learn the crossover from one of the best ball handlers in the game.',
    instructions: 'Sell one direction, then crossover to the other side or counter with an in and out dribble.',
    tips: [
      'Step 1: Skip to the left side with your left foot',
      'Step 2: Fake the explosive move to the right with your right foot',
      'Step 3: Cross over to the left or counter by faking the crossover and in and out to the right side.',
    ],
    videoUrl: 'https://youtu.be/tY0jpDHY_oE',
    tags: ['Ball handling', 'advanced','signature move', 'Learning moves']
  },
  {
    title:'A look into a Jimmy Butler workout',
    duration: 10,
    description: 'Discover an energetic workout session in Istanbul with Jimmy Butler, showcasing various drills and exercises aimed at enhancing athletic performance. The focus is on reaction training, agility drills, and strength exercises',
    timestamps: [
      { time: '00:02', label: 'Introduction' },
      { time: '01:28', label: 'Progress Check' },
      { time: '02:57', label: 'Strength Training' },
      { time: '04:52', label: 'Pull-Ups' },
      { time: '05:48', label: 'RDL Exercise' },
      { time: '06:16', label: 'Interaction with Training Partner' },
    ],
    videoUrl: 'https://youtu.be/rY8IqzakXEA',
    tags: ['workout', 'advanced','nba', 'Workouts']
  },
  {
    title: 'Steph Curry explains where to aim when shooting',
    duration: 2,
    description: 'Learn where to aim when shooting from the best shooter in the game.',
    instructions: 'Listen to Steph Curry explain where to aim when shooting.',
    videoUrl: 'https://youtu.be/nievJITvq_o',
    tags: ['Shooting', 'advanced','lessons','Masterclass']
  },
  {
    title: 'Warmup for vertical jump',
    duration: 10,
    description: 'Warmup for vertical jump',
    instructions: '6 exercices to improve your vertical jump instantly',
    workoutSteps: [
      { time:'2:06' , title: 'Leg kicks',description:'Swing your leg like a pendulum',type:'none'},
      { time:'2:36' , title: 'Chair stepovers',description:'Find a chair or pretend like your walking over a chair and take big steps forwards and backwards',type:'none'},
      { time:'4:08' , title: 'Back extensions aka Good mornings',description:'Start with light reps, then add some speed to it',type:'none'},
      { time:'5:57' , title: 'Drop landing',description:'Drop drom a chair and try to absorb the impact with one or two legs',type:'none'},
      { time:'8:24' , title: 'Drop landing (alternative)',description:'Take a big dropstep, and hold the jumping position for a few seconds',type:'none'}
    ],
    videoUrl: 'https://youtu.be/_nPszYCP6JY',
    tags: ['warm-up', 'Workouts', 'Strength & conditionning']
  },
  {
    title: 'Warming up without a Ball',
    description:'Simple routine to warm up your body before a game or practice.',
    duration: 3,
    instructions: 'First run slowly, secondly warmup your joints, and finally exercices with increasing intensity.',
    videoUrl: 'https://youtu.be/kI72juFRuEI',
    workoutSteps: [
      { time:'0:25' , title: 'Jogging slowly',description:'Start with a slow jog',type:'none'},
      { time:'0:36' , title: 'Joint warmup',description:'Warm up your ankles, knees, hips, shoulders and wrists ',type:'none'},
      { time:'1:24' , title: 'Dynamic exercices',description:'High knees, butt kicks, etc.',type:'none'}
    ],

    tags: ['warm-up', 'beginner', 'Workouts','Strength & conditionning']
  },
  {
    title: 'Post player warmup',
    duration: 4,
    description: 'Warmup for post players, improve your footwork and finishing.',
    videoUrl: 'https://youtu.be/GO9MsOzRt3o',
    tags: ['warm-up', 'post player', 'Workouts','Finishing'],
    workoutSteps: [
      { time:'0:12' , title: 'One leg baby hooks',description:'Alternate between right leg left hand and left leg right hand',type:'none'},
      { time:'0:35' , title: 'One leg reverse layups',description:'Same as before, but finish with a reverse layup',type:'none'},
      { time:'1:04' , title: 'Pro hops',description:'Dribble outside the body and outside the basket',type:'none'},
      { time:'1:38' , title: 'Rebounding tap drill',description:'Tap the ball two times on the backboard with one hand then catch the ball ,as soon as you land explode to the basket',type:'none'},
      { time:'3:03' , title: 'Double time',description:'Same as before , but switch side/hands after each rep',type:'none'}
    ],
  }
];