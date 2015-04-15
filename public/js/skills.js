(function (ik, moment) {

  var PRESENT = _.map(moment().toArray().slice(0, 3), function (d, i) {
    return i === 1 ? d + 1 : d;
  });

  var jobs = [
    {
      name    : 'Self employed',
      from    : [2005, 01],
      to      : [2006, 01],
      skills  : [
        'HTML', 'CSS', 'JavaScript', 'PHP', 'Linux', 'Windows', 'C#',
        'ASP.NET'
      ]
    },
    {
      name    : 'Nations Info Corp.',
      from    : [2006, 01],
      to      : [2007, 06],
      skills  : [
        'HTML', 'Eclipse', 'Java', 'CSS', 'JavaScript',
        'MySQL', 'Bugzilla', 'SVN', 'Apache', 'Windows'
      ]
    },
    {
      name    : 'Disney Interactive Studios',
      from    : [2007, 06],
      to      : [2012, 01],
      skills  : [
        'HTML', 'CSS', 'JavaScript', 'jQuery', 'MooTools', 'AJAX',
        'Visual Studio', 'C#', 'ASP.NET', 'Microsoft SQL',
        'IIS', 'Windows', 'Perforce'
      ]
    },
    {
      name    : 'Horsepower.com',
      from    : [2012, 01],
      to      : [2012, 10],
      skills  : [
        'HTML', 'CSS', 'JavaScript', 'jQuery', 'Bootstrap', 'AJAX',
        'Visual Studio', 'C#', 'ASP.NET', 'Microsoft SQL',
        'IIS', 'Windows', 'ADO.NET'
      ]
    },
    {
      name    : 'ResMed',
      from    : [2012, 10],
      to      : [2015, 04],
      skills  : [
        'HTML', 'CSS', 'JavaScript', 'jQuery', 'AJAX',
        'IntelliJ', 'Java', 'JSP', 'Tiles', 'Microsoft SQL',
        'JBoss', 'Linux', 'JPA', 'Hibernate', 'node.js',
        'Cucumber', 'Jasmine', 'Sinon', 'Mocha', 'Chai', 'JUnit',
        'JIRA', 'Bamboo', 'Crucible', 'Confluence', 'Scrum', 'Agile'
      ]
    }
  ];

  var skills = [
    {
      groupName: 'Web',
      items: [
        {
          itemName: 'AJAX',
          periods: [
            { from: [2008, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'JavaScript',
          periods: [
            { from: [2005, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'CSS',
          periods: [
            { from: [2005, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'HTML',
          periods: [
            { from: [2005, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'jQuery',
          periods: [
            { from: [2009, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'MooTools',
          periods: [
            { from: [2007, 06], to: [2009, 01] }
          ]
        },
        {
          itemName: 'JSP',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Tiles',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'ASP.NET',
          periods: [
            { from: [2007, 06], to: [2012, 01] }
          ]
        },

        {
          itemName: 'PHP',
          periods: [
            { from: [2005, 01], to: [2007, 06] }
          ]
        }
      ]
    },

    {
      groupName: 'Server Platforms',
      items: [
        {
          itemName: 'Apache',
          periods: [
            { from: [2005, 01], to: [2007, 06] }
          ]
        },
        {
          itemName: 'IIS',
          periods: [
            { from: [2007, 06], to: [2012, 10] }
          ]
        },
        {
          itemName: 'node.js',
          periods: [
            { from: [2012, 10], to: PRESENT }
          ]
        },
        {
          itemName: 'JBoss',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Jetty',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        }
      ]
    },

    {
      groupName: 'Languages',
      items: [
        {
          itemName: 'C#',
          periods: [
            { from: [2006, 01], to: [2012, 10] }
          ]
        },
        {
          itemName: 'Java',
          periods: [
            { from: [2006, 01], to: [2007, 06] },
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'JavaScript',
          periods: [
            { from: [2005, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'PHP',
          periods: [
            { from: [2005, 01], to: [2007, 06] }
          ]
        }
      ]
    },

    {
      groupName: 'Source control',
      items: [
        {
          itemName: 'SVN',
          periods: [
            { from: [2006, 01], to: [2007, 06] },
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Perforce',
          periods: [
            { from: [2007, 06], to: [2012, 01] }
          ]
        },
        {
          itemName: 'Mercurial',
          periods: [
            { from: [2012, 01], to: [2012, 10] }
          ]
        },
        {
          itemName: 'Git',
          periods: [
            { from: [2013, 04], to: PRESENT }
          ]
        }
      ]
    },

    {
      groupName: 'Management tools',
      items: [
        {
          itemName: 'Bugzilla',
          periods: [
            { from: [2006, 01], to: [2007, 06] }
          ]
        },
        {
          itemName: 'Bitbucket',
          periods: [
            { from: [2012, 01], to: [2012, 10] }
          ]
        },
        {
          itemName: 'JIRA',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Crucible',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Bamboo',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Confluence',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        }
      ]
    },

    {
      groupName: 'IDEs',
      items: [
        {
          itemName: 'Notepad++',
          periods: [
            { from: [2005, 01], to: [2006, 01] }
          ]
        },
        {
          itemName: 'Eclipse',
          periods: [
            { from: [2006, 01], to: [2007, 06] }
          ]
        },
        {
          itemName: 'Visual Studio',
          periods: [
            { from: [2007, 06], to: [2012, 10] }
          ]
        },
        {
          itemName: 'IntelliJ',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'WebStorm',
          periods: [
            { from: [2015, 03], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Sublime Text',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        }
      ]
    },

    {
      groupName: 'OS',
        items: [
        {
          itemName: 'Linux',
          periods: [
            { from: [2005, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'Windows',
          periods: [
            { from: [2005, 01], to: PRESENT }
          ]
        },
        {
          itemName: 'OSX',
          periods: [
            { from: [2009, 06], to: PRESENT }
          ]
        }
      ]
    },

    {
      groupName: 'Database',
      items: [
        {
          itemName: 'Microsoft SQL',
          periods: [
            { from: [2007, 06], to: [2015, 04] }
          ]
        },
        {
          itemName: 'MySQL',
          periods: [
            { from: [2005, 01], to: [2007, 06] }
          ]
        },
        {
          itemName: 'ADO.NET',
          periods: [
            { from: [2012, 01], to: [2012, 10] }
          ]
        },
        {
          itemName: 'JPA',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Hibernate',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        }
      ]
    },

    {
      groupName: 'Testing',
      items: [
        {
          itemName: 'Selenium',
          periods: [
            { from: [2009, 01], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Cucumber',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Jasmine',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Sinon',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Mocha',
          periods: [
            { from: [2014, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Chai',
          periods: [
            { from: [2014, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Karma',
          periods: [
            { from: [2014, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Istanbul',
          periods: [
            { from: [2014, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'JUnit',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        },
        {
          itemName: 'Clover',
          periods: [
            { from: [2012, 10], to: [2015, 04] }
          ]
        }
      ]
    }

  ];

  ik.skillData = {
    jobs: jobs,
    skills: skills,
    PRESENT: PRESENT
  };

}(window.ik, window.moment));