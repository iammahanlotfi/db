window.QUESTIONS = [
  {
    "id": "easy-1",
    "level": "easy",
    "title": "دانشجو و گروه آموزشی",
    "scenario": "هر دانشجو شماره و نام دارد و حتماً عضو یک گروه آموزشی است. هر گروه شماره و نام دارد و می‌تواند صفر یا چند دانشجو داشته باشد. تاریخ شروع عضویت ثبت می‌شود. رشتهٔ نام از نوع متنی و شماره‌ها عدد صحیح‌اند.",
    "schema": "DEPT(DID, Name)\n  PK: DID\nSTUDENT(SID, Name, DID, SinceDate)\n  PK: SID\n  FK: DID → DEPT(DID)\n  NOT NULL: DID",
    "reason": "شمارهٔ گروه را در سطر دانشجو می‌گذاریم؛ هر دانشجو یک گروه دارد، پس یک خانه کافی است. یک DID می‌تواند برای چند دانشجو تکرار شود. تاریخ عضویت هم کنار همین شماره می‌آید.",
    "queries": [
      {
        "prompt": "نام دانشجویان گروه 11 که نامشان با A شروع می‌شود؛ به ترتیب نام.",
        "sql": "SELECT Name FROM STUDENT\nWHERE DID = 11 AND Name LIKE 'A%'\nORDER BY Name;",
        "why": "اول فقط گروه 11 را نگه دار. A% یعنی اول نام A باشد. ORDER BY نام‌ها را مرتب می‌کند."
      },
      {
        "prompt": "گروه‌هایی که نامشان با Math برابر است.",
        "sql": "SELECT DID, Name FROM DEPT WHERE Name = 'Math';",
        "why": "مقدار متنی داخل تک‌نقل‌قول می‌آید."
      },
      {
        "prompt": "دانشجوی 101 به نام Ali را در گروه 11 اضافه کن؛ تاریخ عضویت 2026-01-01 است.",
        "sql": "INSERT INTO STUDENT (SID, Name, DID, SinceDate)\nVALUES (101, 'Ali', 11, '2026-01-01');",
        "why": "اسم ستون‌ها و مقدارها باید هم‌ترتیب باشند. فرض می‌کنیم گروه 11 موجود است و دانشجوی 101 هنوز ثبت نشده."
      }
    ],
    "source": "اقتباس و ساده‌سازی از Fundamentals of Database Systems، فایل databases-ramaz.pdf، تمرین ۷٫۱۶، صفحات PDF ۲۶۳–۲۶۴. کوئری‌ها و راهنما برای این اپ تألیف شده‌اند.",
    "lesson": "علی فقط یک گروه دارد، ولی یک گروه می‌تواند علی و سارا و رضا را با هم داشته باشد. این همان یک‌به‌چند است. نام دانشجو صفت است؛ خود علی یک نمونهٔ موجودیت است.",
    "trap": "در جدول دانشجو DID کلید خارجی است، نه کلید اصلی. دو دانشجو می‌توانند عضو یک گروه باشند.",
    "diagram": "diagrams/easy-1.svg",
    "entities": [
      [
        "s",
        "دانشجو",
        [
          "#SID",
          "Name"
        ]
      ],
      [
        "d",
        "گروه آموزشی",
        [
          "#DID",
          "Name"
        ]
      ]
    ],
    "relations": [
      [
        "عضویت",
        [
          [
            "s",
            "(1,1)"
          ],
          [
            "d",
            "(0,N)"
          ]
        ],
        [
          "SinceDate"
        ]
      ]
    ]
  },
  {
    "id": "easy-2",
    "level": "easy",
    "title": "مدیر گروه؛ یک‌به‌یک",
    "scenario": "هر گروه دقیقاً یک استادِ مدیر دارد. هر استاد حداکثر مدیر یک گروه است و ممکن است اصلاً مدیر نباشد. استاد و گروه هر دو شماره و نام دارند.",
    "schema": "PROF(PID, Name)\n  PK: PID\nDEPT(DID, Name, ManagerID)\n  PK: DID\n  FK: ManagerID → PROF(PID)\n  UNIQUE, NOT NULL: ManagerID",
    "reason": "هر گروه یک جای اجباری برای شمارهٔ مدیر دارد. UNIQUE مانع می‌شود یک استاد مدیر دو گروه شود. PID مدیر، شناسهٔ خود گروه نیست.",
    "queries": [
      {
        "prompt": "نام گروه و نام مدیرش را نمایش بده.",
        "sql": "SELECT d.Name AS Department, p.Name AS Manager\nFROM DEPT d JOIN PROF p ON p.PID = d.ManagerID;",
        "why": "از روی شمارهٔ مدیر به سطر استاد می‌رسیم و نام او را می‌خوانیم."
      },
      {
        "prompt": "شماره و نام استادانی که نامشان Reza نیست.",
        "sql": "SELECT PID, Name FROM PROF WHERE Name <> 'Reza';",
        "why": "<> یعنی نابرابر."
      },
      {
        "prompt": "مدیر گروه 11 را استاد 3 قرار بده.",
        "sql": "UPDATE DEPT SET ManagerID = 3 WHERE DID = 11;",
        "why": "فرض می‌کنیم استاد 3 وجود دارد و مدیر گروه دیگری نیست. WHERE فقط گروه موردنظر را عوض می‌کند."
      }
    ],
    "source": "تألیف بر اساس الگوی مدیریت COMPANY در databases-ramaz.pdf، فصل ۷، بخش‌های ۷٫۲ تا ۷٫۴؛ قالب پرسش بازطراحی شده است.",
    "lesson": "یک گروه یک مدیر می‌خواهد. هر استاد لازم نیست مدیر باشد. عدد 1 حداکثر را می‌گوید و خط دوتایی سمت گروه، اجبار را.",
    "trap": "بدون UNIQUE روی ManagerID، طرح می‌تواند به هر استاد چند گروه بدهد.",
    "diagram": "diagrams/easy-2.svg",
    "entities": [
      [
        "p",
        "استاد",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "d",
        "گروه",
        [
          "#DID",
          "Name"
        ]
      ]
    ],
    "relations": [
      [
        "مدیریت",
        [
          [
            "p",
            "(0,1)"
          ],
          [
            "d",
            "(1,1)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "easy-3",
    "level": "easy",
    "title": "انتخاب درس در یک ترم",
    "scenario": "این پایگاه فقط یک ترم را نگه می‌دارد. هر دانشجو چند درس و هر درس چند دانشجو می‌تواند داشته باشد. هر دانشجو هر درس را حداکثر یک بار می‌گیرد. نمره ممکن است هنوز اعلام نشده باشد و اگر اعلام شود بین صفر و 20 است.",
    "schema": "STUDENT(SID, Name)\n  PK: SID\nCOURSE(CID, Title, Credits)\n  PK: CID\nENROLL(SID, CID, Grade)\n  PK: (SID, CID)\n  FK: SID → STUDENT(SID)\n  FK: CID → COURSE(CID)\n  CHECK: Grade BETWEEN 0 AND 20",
    "reason": "برای چندبه‌چند یک جدول سوم می‌سازیم. هر سطر می‌گوید این دانشجو این درس را گرفته و نمره‌اش چیست. Grade به این جفت وابسته است.",
    "queries": [
      {
        "prompt": "شمارهٔ دانشجویانی با نمرهٔ بین 15 و 18، بدون تکرار.",
        "sql": "SELECT DISTINCT SID FROM ENROLL\nWHERE Grade BETWEEN 15 AND 18;",
        "why": "دو سر بازه هم حساب می‌شوند. DISTINCT شمارهٔ تکراری را در خروجی برمی‌دارد."
      },
      {
        "prompt": "انتخاب‌هایی که نمره‌شان اعلام نشده.",
        "sql": "SELECT SID, CID FROM ENROLL WHERE Grade IS NULL;",
        "why": "NULL یعنی نمرهٔ معلوم نداریم. برای آزمایش آن از IS NULL استفاده می‌کنیم."
      },
      {
        "prompt": "بیشترین و میانگین نمرهٔ درس 2.",
        "sql": "SELECT MAX(Grade) AS Highest, AVG(Grade) AS Average\nFROM ENROLL WHERE CID = 2;",
        "why": "اول درس 2 را جدا کن، بعد از نمره‌های معلوم بیشینه و میانگین بگیر."
      }
    ],
    "source": "اقتباس و ساده‌سازی از Fundamentals of Database Systems، فایل databases-ramaz.pdf، تمرین ۷٫۱۶، صفحات PDF ۲۶۳–۲۶۴. کوئری‌ها و راهنما برای این اپ تألیف شده‌اند.",
    "lesson": "اگر نام درس را کنار همهٔ انتخاب‌ها بنویسی، بارها تکرار می‌شود. عنوان یک بار در COURSE ذخیره می‌شود و ENROLL فقط شمارهٔ آن را نگه می‌دارد.",
    "trap": "نمره صفت رابطه است. SID به‌تنهایی کلید ENROLL نیست چون هر دانشجو چند درس دارد.",
    "diagram": "diagrams/easy-3.svg",
    "entities": [
      [
        "s",
        "دانشجو",
        [
          "#SID",
          "Name"
        ]
      ],
      [
        "c",
        "درس",
        [
          "#CID",
          "Title",
          "Credits"
        ]
      ]
    ],
    "relations": [
      [
        "انتخاب",
        [
          [
            "s",
            "(0,N)"
          ],
          [
            "c",
            "(0,N)"
          ]
        ],
        [
          "Grade"
        ]
      ]
    ]
  },
  {
    "id": "easy-4",
    "level": "easy",
    "title": "تأمین‌کننده و قطعه",
    "scenario": "هر تأمین‌کننده شماره، نام، شهر و وضعیت دارد. قطعه شماره، نام و وزن دارد. هر تأمین‌کننده چند نوع قطعه می‌دهد و هر قطعه را چند تأمین‌کننده می‌توانند بدهند. برای هر جفت فقط یک مقدارِ کلِ تعداد نگه می‌داریم.",
    "schema": "SUPPLIER(SID, Name, City, Status)\n  PK: SID\nPART(PID, Name, Weight)\n  PK: PID\nSP(SID, PID, Qty)\n  PK: (SID, PID)\n  FK: SID → SUPPLIER(SID)\n  FK: PID → PART(PID)",
    "reason": "SP فهرست اتفاق‌هاست: چه کسی چه قطعه‌ای را چند تا داده؟ شماره‌ها با هم کلیدند و هر کدام جدا به جدول صاحبش اشاره می‌کنند.",
    "queries": [
      {
        "prompt": "نام تأمین‌کننده‌های قطعهٔ 2.",
        "sql": "SELECT s.Name FROM SUPPLIER s\nWHERE s.SID IN (SELECT SID FROM SP WHERE PID = 2);",
        "why": "اول شماره‌ها را از SP بگیر، بعد نام همان شماره‌ها را از SUPPLIER بخوان."
      },
      {
        "prompt": "قطعاتی با وزن 5 تا 15؛ از سنگین به سبک.",
        "sql": "SELECT PID, Name FROM PART\nWHERE Weight BETWEEN 5 AND 15 ORDER BY Weight DESC;",
        "why": "DESC یعنی ترتیب نزولی."
      },
      {
        "prompt": "مجموع تعداد قطعات تأمین‌شده توسط تأمین‌کنندهٔ 1.",
        "sql": "SELECT SUM(Qty) AS Total FROM SP WHERE SID = 1;",
        "why": "SUM تعداد فیزیکی را جمع می‌کند. COUNT فقط تعداد سطرها را می‌شمرد."
      }
    ],
    "source": "اقتباس از الگوی suppliers–parts در db-depth.pdf، مثال‌های فصل ۱؛ صورت سؤال و کوئری‌ها تألیف شده‌اند.",
    "lesson": "یک سطر SP مثل این جمله است: علی 120 مهره داده. نام علی در SUPPLIER و نام مهره در PART است.",
    "trap": "یک نوع قطعه با تعداد زیادی از همان قطعه فرق دارد: COUNT(DISTINCT PID) نوع‌ها را می‌شمرد و SUM(Qty) تعداد را.",
    "diagram": "diagrams/easy-4.svg",
    "entities": [
      [
        "s",
        "تأمین‌کننده",
        [
          "#SID",
          "Name",
          "City",
          "Status"
        ]
      ],
      [
        "p",
        "قطعه",
        [
          "#PID",
          "Name",
          "Weight"
        ]
      ]
    ],
    "relations": [
      [
        "تأمین",
        [
          [
            "s",
            "(0,N)"
          ],
          [
            "p",
            "(0,N)"
          ]
        ],
        [
          "Qty"
        ]
      ]
    ]
  },
  {
    "id": "easy-5",
    "level": "easy",
    "title": "کتاب و نسخهٔ فیزیکی",
    "scenario": "هر عنوان کتاب شماره و عنوان دارد. از یک عنوان چند نسخهٔ فیزیکی ممکن است موجود باشد. هر نسخه شمارهٔ سراسری، محل قفسه و شمارهٔ عنوان کتابش را دارد و حتماً متعلق به یک عنوان است. یک عنوان ممکن است فعلاً نسخه نداشته باشد.",
    "schema": "BOOK(BID, Title)\n  PK: BID\nCOPY(CopyID, BID, Shelf)\n  PK: CopyID\n  FK: BID → BOOK(BID)\n  NOT NULL: BID",
    "reason": "نسخه با شمارهٔ سراسری خودش شناخته می‌شود و قوی است. برای پیدا کردنش به ترکیب شمارهٔ کتاب و شمارهٔ نسخه نیاز نداریم.",
    "queries": [
      {
        "prompt": "عنوان و شمارهٔ نسخه‌های قفسهٔ A1.",
        "sql": "SELECT b.Title, c.CopyID\nFROM BOOK b JOIN COPY c ON c.BID = b.BID\nWHERE c.Shelf = 'A1';",
        "why": "قفسه در COPY و عنوان در BOOK است؛ با BID وصلشان کن."
      },
      {
        "prompt": "تعداد نسخه‌های هر عنوانی که دست‌کم یک نسخه دارد.",
        "sql": "SELECT BID, COUNT(*) AS Copies FROM COPY GROUP BY BID;",
        "why": "سطرهای یک عنوان کنار هم می‌آیند و هر سطر یک نسخه است."
      },
      {
        "prompt": "قفسهٔ نسخهٔ 7 را B2 کن.",
        "sql": "UPDATE COPY SET Shelf = 'B2' WHERE CopyID = 7;",
        "why": "کلید اصلی در شرط، یک نسخهٔ دقیق را پیدا می‌کند."
      }
    ],
    "source": "اقتباس از همان منبع، تمرین ۸٫۱۹، صفحات PDF ۳۰۴–۳۰۵؛ تاریخچه و سقف امانت مطابق قالب امتحان شما ساده‌سازی شده‌اند.",
    "lesson": "دو جلد یکسانِ پایگاه داده، یک عنوان و دو نسخه‌اند. وقتی یکی را امانت می‌دهیم، هنوز می‌توانیم دیگری را در قفسه داشته باشیم.",
    "trap": "شمارهٔ عنوان با شمارهٔ نسخه فرق دارد؛ امانت باید نسخهٔ مشخص را معلوم کند.",
    "diagram": "diagrams/easy-5.svg",
    "entities": [
      [
        "b",
        "عنوان کتاب",
        [
          "#BID",
          "Title"
        ]
      ],
      [
        "c",
        "نسخه",
        [
          "#CopyID",
          "Shelf"
        ]
      ]
    ],
    "relations": [
      [
        "نسخهٔ",
        [
          [
            "b",
            "(0,N)"
          ],
          [
            "c",
            "(1,1)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "easy-6",
    "level": "easy",
    "title": "بانک و شعبهٔ ضعیف",
    "scenario": "هر بانک کد و نام دارد. هر شعبه داخل بانک خودش شماره‌گذاری می‌شود و شهر دارد. شمارهٔ شعبه ممکن است در دو بانک تکرار شود. شعبه حتماً متعلق به یک بانک است و بانک ممکن است چند شعبه داشته باشد.",
    "schema": "BANK(BID, Name)\n  PK: BID\nBRANCH(BID, BranchNo, City)\n  PK: (BID, BranchNo)\n  FK: BID → BANK(BID)",
    "reason": "شعبهٔ 1ِ بانک A با شعبهٔ 1ِ بانک B فرق دارد. باید کد بانک و شمارهٔ شعبه را با هم بگوییم. BranchNo ممیزه است.",
    "queries": [
      {
        "prompt": "شهر شعبه‌های بانک 1، بدون تکرار.",
        "sql": "SELECT DISTINCT City FROM BRANCH WHERE BID = 1;",
        "why": "یک شهر ممکن است چند شعبه داشته باشد؛ DISTINCT شهر را یک بار نشان می‌دهد."
      },
      {
        "prompt": "تعداد شعبه‌های هر بانکِ دارای شعبه.",
        "sql": "SELECT BID, COUNT(*) AS Branches FROM BRANCH GROUP BY BID;",
        "why": "فقط بانک‌هایی که سطر شعبه دارند در این نتیجه دیده می‌شوند."
      },
      {
        "prompt": "شعبهٔ 3 بانک 1 را به شهر Shiraz منتقل کن.",
        "sql": "UPDATE BRANCH SET City = 'Shiraz'\nWHERE BID = 1 AND BranchNo = 3;",
        "why": "برای پیدا کردن یک شعبه هر دو جزء کلید لازم‌اند."
      }
    ],
    "source": "اقتباس از همان منبع، تمرین ۷٫۲۳ و شکل ۷٫۲۱، صفحات PDF ۲۶۶–۲۶۷. فرض‌ها و کوئری‌ها بازطراحی شده‌اند.",
    "lesson": "مستطیل شعبه دوتایی، رابطهٔ دارد دوتایی و مشارکت شعبه اجباری است. شهر یک صفت است؛ در این سؤال اطلاعات مستقلی برای شهر نداریم.",
    "trap": "فقط BranchNo را در شرط نگذار؛ ممکن است شعبه‌های بانک‌های دیگر هم عوض شوند.",
    "diagram": "diagrams/easy-6.svg",
    "entities": [
      [
        "b",
        "بانک",
        [
          "#BID",
          "Name"
        ]
      ],
      [
        "r",
        "*شعبه",
        [
          "BranchNo (partial key)",
          "City"
        ]
      ]
    ],
    "relations": [
      [
        "*دارد",
        [
          [
            "b",
            "(0,N)"
          ],
          [
            "r",
            "(1,1)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "medium-1",
    "level": "medium",
    "title": "کتابخانه؛ الان و در طول تاریخ",
    "scenario": "هر عضو شماره و نام دارد. هر نسخه شمارهٔ سراسری و عنوان دارد. هر امانت شمارهٔ مستقل، یک عضو، یک نسخه، تاریخ شروع و تاریخ برگشت دارد. برگشتِ امانتِ باز NULL است. هر عضو و هر نسخه هم‌زمان حداکثر یک امانت باز دارند، ولی در گذشته می‌توانند بارها تکرار شوند.",
    "schema": "MEMBER(MID, Name)\n  PK: MID\nCOPY(CopyID, Title)\n  PK: CopyID\nLOAN(LID, MID, CopyID, StartDate, ReturnDate)\n  PK: LID\n  FK: MID → MEMBER(MID)\n  FK: CopyID → COPY(CopyID)\n  NOT NULL: MID, CopyID, StartDate\nقاعده: MID و CopyID هرکدام در امانت‌های باز یکتا هستند.",
    "reason": "یک امانت یک رخداد مستقل است. علی امروز و ماه بعد می‌تواند همان نسخه را بگیرد؛ دو LID متفاوت داریم. محدودیتِ هم‌زمانی را فقط روی سطرهای ReturnDate IS NULL اعمال می‌کنیم.",
    "queries": [
      {
        "prompt": "عنوان نسخه‌هایی که الان امانت‌اند.",
        "sql": "SELECT c.CopyID, c.Title FROM COPY c\nJOIN LOAN l ON l.CopyID = c.CopyID\nWHERE l.ReturnDate IS NULL;",
        "why": "هنوز برگشت ثبت نشده، پس نسخه بیرون کتابخانه است."
      },
      {
        "prompt": "اعضایی که در کل تاریخ بیشتر از 10 بار امانت گرفته‌اند.",
        "sql": "SELECT m.MID, m.Name FROM MEMBER m\nJOIN LOAN l ON l.MID = m.MID\nGROUP BY m.MID, m.Name HAVING COUNT(*) > 10;",
        "why": "همهٔ امانت‌های باز و بسته را می‌شماریم. دو عضو هم‌نام با MID از هم جدا می‌شوند."
      },
      {
        "prompt": "اعضایی که هیچ امانتی ندارند.",
        "sql": "SELECT m.Name FROM MEMBER m\nWHERE NOT EXISTS (SELECT 1 FROM LOAN l WHERE l.MID = m.MID);",
        "why": "برای هر عضو دنبال حتی یک امانت بگرد. اگر پیدا نشد، نامش را بده."
      }
    ],
    "source": "اقتباس از همان منبع، تمرین ۸٫۱۹، صفحات PDF ۳۰۴–۳۰۵؛ تاریخچه و سقف امانت مطابق قالب امتحان شما ساده‌سازی شده‌اند.",
    "lesson": "الان علی فقط یک کتاب دستش است، ولی شاید قبلاً 30 بار کتاب گرفته. برای سؤال تاریخچه باید هر بار را جدا نگه داریم.",
    "trap": "UNIQUE روی MID در کل LOAN نگذار؛ با این کار علی در تمام عمر فقط یک بار می‌تواند کتاب بگیرد.",
    "diagram": "diagrams/medium-1.svg",
    "entities": [
      [
        "m",
        "عضو",
        [
          "#MID",
          "Name"
        ]
      ],
      [
        "c",
        "نسخه",
        [
          "#CopyID",
          "Title"
        ]
      ],
      [
        "l",
        "امانت",
        [
          "#LID",
          "StartDate",
          "ReturnDate"
        ]
      ]
    ],
    "relations": [
      [
        "امانت‌گیرنده",
        [
          [
            "m",
            "(0,N)"
          ],
          [
            "l",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "نسخهٔ امانت",
        [
          [
            "c",
            "(0,N)"
          ],
          [
            "l",
            "(1,1)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "medium-2",
    "level": "medium",
    "title": "گروه درس و تکرار انتخاب",
    "scenario": "هر درس چند گروه در سال‌ها و ترم‌های مختلف دارد. شمارهٔ گروه فقط برای یک درس در یک سال و ترم یکتاست. هر گروه دقیقاً یک استاد دارد. دانشجو چند گروه می‌گیرد و هر گروه چند دانشجو دارد؛ نمرهٔ هر انتخاب ممکن است NULL باشد.",
    "schema": "COURSE(CID, Title)\n  PK: CID\nPROF(PID, Name)\n  PK: PID\nSECTION(CID, Year, Term, GroupNo, PID)\n  PK: (CID, Year, Term, GroupNo)\n  FK: CID → COURSE(CID)\n  FK: PID → PROF(PID)\nSTUDENT(SID, Name)\n  PK: SID\nENROLL(SID, CID, Year, Term, GroupNo, Grade)\n  PK: (SID, CID, Year, Term, GroupNo)\n  FK: SID → STUDENT(SID)\n  FK: (CID, Year, Term, GroupNo) → SECTION(CID, Year, Term, GroupNo)",
    "reason": "گروه 2 به‌تنهایی کافی نیست. گروه 2 کدام درس، کدام سال و ترم؟ چهار جزء با هم گروه را مشخص می‌کنند و همان چهار جزء با هم کلید خارجی ENROLL هستند.",
    "queries": [
      {
        "prompt": "نام استاد و عنوان گروه‌های درس در سال 2026 ترم 2.",
        "sql": "SELECT p.Name, c.Title, g.GroupNo FROM SECTION g\nJOIN PROF p ON p.PID=g.PID JOIN COURSE c ON c.CID=g.CID\nWHERE g.Year=2026 AND g.Term=2;",
        "why": "مشخصات استاد را از PROF و عنوان درس را از COURSE پیدا کن."
      },
      {
        "prompt": "دانشجویانی که در همان ترم بیشتر از 7 درس متفاوت گرفته‌اند.",
        "sql": "SELECT SID FROM ENROLL WHERE Year=2026 AND Term=2\nGROUP BY SID HAVING COUNT(DISTINCT CID)>7;",
        "why": "تعداد درس متفاوت را می‌خواهیم، نه صرفاً تعداد گروه."
      },
      {
        "prompt": "دانشجویانی که در همان ترم همهٔ نمراتشان معلوم و بالاتر از 18 است.",
        "sql": "SELECT SID FROM ENROLL WHERE Year=2026 AND Term=2\nGROUP BY SID\nHAVING COUNT(Grade)=COUNT(*) AND MIN(Grade)>18;",
        "why": "MIN مقدارهای خالی را کنار می‌گذارد؛ برابر بودن دو COUNT جلوی قبول شدن نمرهٔ نامعلوم را می‌گیرد."
      }
    ],
    "source": "اقتباس و ساده‌سازی از Fundamentals of Database Systems، فایل databases-ramaz.pdf، تمرین ۷٫۱۶، صفحات PDF ۲۶۳–۲۶۴. کوئری‌ها و راهنما برای این اپ تألیف شده‌اند. همچنین تمرین ۷٫۲۶ در صفحهٔ PDF ۲۶۸.",
    "lesson": "مثل برگهٔ انتخاب واحد خودت فکر کن. یک درس ممکن است در سال بعد دوباره ارائه شود؛ شمارهٔ گروه بدون زمان، آدرس کامل کلاس نیست.",
    "trap": "در JOIN روی SECTION فقط CID را مقایسه نکن؛ سال، ترم و گروه هم باید تطبیق کنند.",
    "diagram": "diagrams/medium-2.svg",
    "entities": [
      [
        "c",
        "درس",
        [
          "#CID",
          "Title"
        ]
      ],
      [
        "p",
        "استاد",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "g",
        "*گروه درس",
        [
          "GroupNo (partial)",
          "Year (partial)",
          "Term (partial)"
        ]
      ],
      [
        "s",
        "دانشجو",
        [
          "#SID",
          "Name"
        ]
      ]
    ],
    "relations": [
      [
        "*دارد",
        [
          [
            "c",
            "(0,N)"
          ],
          [
            "g",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "ارائه",
        [
          [
            "p",
            "(0,N)"
          ],
          [
            "g",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "انتخاب",
        [
          [
            "s",
            "(0,N)"
          ],
          [
            "g",
            "(0,N)"
          ]
        ],
        [
          "Grade"
        ]
      ]
    ]
  },
  {
    "id": "medium-3",
    "level": "medium",
    "title": "تلفن و سوابق تحصیلی",
    "scenario": "هر کارمند شماره، نام و آدرس مرکب از شهر و خیابان دارد. صفر یا چند تلفن دارد. هر سابقهٔ تحصیلی یک شمارهٔ محلیِ مستقل درون همان کارمند، عنوان، مؤسسه و تاریخ شروع و پایان دارد. با تاریخ تولد می‌توان سن را محاسبه کرد.",
    "schema": "EMP(EID, Name, City, Street, BirthDate)\n  PK: EID\nPHONE(EID, Number)\n  PK: (EID, Number)\n  FK: EID → EMP(EID)\nEDUCATION(EID, RecordNo, Title, Institute, StartDate, EndDate)\n  PK: (EID, RecordNo)\n  FK: EID → EMP(EID)\nAge مشتق است و در این طرح ذخیره نمی‌شود.",
    "reason": "آدرس را به اجزای شهر و خیابان می‌شکنیم. برای هر شماره تلفن یک سطر می‌سازیم. سابقه با شمارهٔ کارمند و شمارهٔ محلی پیدا می‌شود.",
    "queries": [
      {
        "prompt": "کارمندهایی با دست‌کم دو شماره تلفن.",
        "sql": "SELECT e.EID,e.Name FROM EMP e JOIN PHONE p ON p.EID=e.EID\nGROUP BY e.EID,e.Name HAVING COUNT(*)>=2;",
        "why": "هر سطر PHONE یک شمارهٔ متفاوت برای کارمند است."
      },
      {
        "prompt": "کارمندهای ساکن Tehran که سابقهٔ تحصیل در Sharif دارند.",
        "sql": "SELECT e.Name FROM EMP e WHERE e.City='Tehran'\nAND EXISTS (SELECT 1 FROM EDUCATION h\nWHERE h.EID=e.EID AND h.Institute='Sharif');",
        "why": "EXISTS برای داشتن حداقل یک سابقه است و با چند سابقه اسم را چند بار تولید نمی‌کند."
      },
      {
        "prompt": "تعداد سوابق تحصیلی هر کارمند، حتی کارمند بی‌سابقه.",
        "sql": "SELECT e.EID,e.Name,COUNT(h.RecordNo) AS Records\nFROM EMP e LEFT JOIN EDUCATION h ON h.EID=e.EID\nGROUP BY e.EID,e.Name;",
        "why": "LEFT JOIN کارمند بی‌سابقه را نگه می‌دارد؛ COUNT ستون فرزند برای او صفر می‌شود."
      }
    ],
    "source": "اقتباس از databases-ramaz.pdf، تمرین‌های ۷٫۱۷ و ۷٫۱۸، صفحهٔ PDF ۲۶۴؛ مرجع ممیزه در database systems design.pdf، صفحهٔ PDF ۲۵.",
    "lesson": "چندمقداری یعنی چند مقدار کامل؛ مرکب یعنی هر مقدار چند تکه دارد. سن از تاریخ تولد به دست می‌آید و در ER با بیضی خط‌چین نمایش داده می‌شود.",
    "trap": "در LEFT JOIN از COUNT(*) برای تعداد فرزند استفاده نکن؛ سطرِ کارمندِ بدون فرزند هم یکی شمرده می‌شود.",
    "diagram": "diagrams/medium-3.svg",
    "entities": [
      [
        "e",
        "کارمند",
        [
          "#EID",
          "Name",
          "City",
          "Street",
          "BirthDate",
          "@Phone",
          "~Age"
        ]
      ],
      [
        "h",
        "*سابقه تحصیلی",
        [
          "RecordNo (partial)",
          "Title",
          "Institute",
          "StartDate",
          "EndDate"
        ]
      ]
    ],
    "relations": [
      [
        "*سوابق",
        [
          [
            "e",
            "(0,N)"
          ],
          [
            "h",
            "(1,1)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "medium-4",
    "level": "medium",
    "title": "مدیر کارمند و پیش‌نیاز درس",
    "scenario": "هر کارمند حداکثر یک مدیر مستقیم دارد که خودش کارمند است. مدیر می‌تواند چند زیردست داشته باشد و مدیر کل ممکن است مدیر نداشته باشد. هر درس چند پیش‌نیاز دارد و خودش می‌تواند پیش‌نیاز چند درس باشد. فقط پیش‌نیاز مستقیم را ثبت می‌کنیم.",
    "schema": "EMP(EID, Name, ManagerID)\n  PK: EID\n  FK: ManagerID → EMP(EID)\nCOURSE(CID, Title)\n  PK: CID\nPREREQ(CID, PreCID)\n  PK: (CID, PreCID)\n  FK: CID → COURSE(CID)\n  FK: PreCID → COURSE(CID)\n  CHECK: CID <> PreCID",
    "reason": "برای مدیریت یک خانهٔ ManagerID در همان کارمند کافی است. برای پیش‌نیاز چندبه‌چند، جدول جفت‌ها لازم است. نقش‌ها را روی دو اتصالِ یک موجودیت بنویس.",
    "queries": [
      {
        "prompt": "نام کارمند و نام مدیر، با حفظ کارمند بدون مدیر.",
        "sql": "SELECT e.Name, m.Name AS Manager\nFROM EMP e LEFT JOIN EMP m ON m.EID=e.ManagerID;",
        "why": "یک جدول را با دو اسم کوتاه استفاده می‌کنیم؛ e کارمند و m مدیر همان سطر است."
      },
      {
        "prompt": "عنوان پیش‌نیازهای مستقیم درس 3.",
        "sql": "SELECT p.Title FROM PREREQ r\nJOIN COURSE p ON p.CID=r.PreCID WHERE r.CID=3;",
        "why": "PreCID شمارهٔ پیش‌نیاز است؛ CID شمارهٔ درس اصلی."
      },
      {
        "prompt": "درس‌هایی که پیش‌نیاز مستقیم ندارند.",
        "sql": "SELECT c.Title FROM COURSE c\nWHERE NOT EXISTS (SELECT 1 FROM PREREQ r WHERE r.CID=c.CID);",
        "why": "وجود نداشتن سطر با نقش درس اصلی یعنی برای آن درس پیش‌نیازی ثبت نشده."
      }
    ],
    "source": "تألیف آموزشی بر پایهٔ مفهوم رابطهٔ بازگشتی در databases-ramaz.pdf، سؤال مروری ۷٫۱۱ و فصل ۷؛ SQL بر پایهٔ فصل ۵ Learning PostgreSQL.",
    "lesson": "علی و مدیر علی هر دو داخل همان فهرست کارمندند. دو اسم کوتاه کمک می‌کند در کوئری بفهمیم کدام نقش را می‌خوانیم.",
    "trap": "چک متفاوت بودن دو شماره جلوی حلقه‌های چندمرحله‌ای پیش‌نیاز را نمی‌گیرد؛ قاعدهٔ نبود چرخه جداست.",
    "diagram": "diagrams/medium-4.svg",
    "entities": [
      [
        "e",
        "کارمند",
        [
          "#EID",
          "Name"
        ]
      ],
      [
        "c",
        "درس",
        [
          "#CID",
          "Title"
        ]
      ]
    ],
    "relations": [
      [
        "مدیریت",
        [
          [
            "e",
            "زیردست (0,1)"
          ],
          [
            "e",
            "مدیر (0,N)"
          ]
        ],
        []
      ],
      [
        "پیش‌نیازی",
        [
          [
            "c",
            "درس (0,N)"
          ],
          [
            "c",
            "پیش‌نیاز (0,N)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "medium-5",
    "level": "medium",
    "title": "لیگ ورزشی و بازیکنان هر مسابقه",
    "scenario": "بازیکن فقط عضو یک تیم فعلی است. هر بازی دقیقاً یک تیم میزبان و یک تیم مهمان متفاوت دارد. هر بازیکن ممکن است در بازی‌های مختلف شرکت کند؛ حضورش در یک بازی فقط یک بار ثبت می‌شود و تعداد گل دارد. حضور فقط برای بازیکن یکی از دو تیم همان بازی مجاز است.",
    "schema": "TEAM(TID, Name)\n  PK: TID\nPLAYER(PID, Name, TID)\n  PK: PID\n  FK: TID → TEAM(TID)\nGAME(GID, HomeID, AwayID, PlayDate)\n  PK: GID\n  FK: HomeID → TEAM(TID)\n  FK: AwayID → TEAM(TID)\n  CHECK: HomeID <> AwayID\nAPPEAR(PID, GID, Goals)\n  PK: (PID, GID)\n  FK: PID → PLAYER(PID)\n  FK: GID → GAME(GID)",
    "reason": "دو کلید خارجی از یک جدول مقصد داریم، ولی یکی میزبان و دیگری مهمان است. حضور، جفت بازیکن و بازی است و گل صفت آن جفت است.",
    "queries": [
      {
        "prompt": "نام بازیکنانی که در بازی 10 شرکت کرده‌اند.",
        "sql": "SELECT p.Name FROM PLAYER p JOIN APPEAR a ON a.PID=p.PID\nWHERE a.GID=10;",
        "why": "فقط بازیکن ثبت‌شده در APPEAR حضور داشته؛ عضو تیم بودن به‌تنهایی کافی نیست."
      },
      {
        "prompt": "بازیکنان با مجموع گل بیشتر از 5.",
        "sql": "SELECT p.PID,p.Name,SUM(a.Goals) AS Total\nFROM PLAYER p JOIN APPEAR a ON a.PID=p.PID\nGROUP BY p.PID,p.Name HAVING SUM(a.Goals)>5;",
        "why": "تمام بازی‌های هر بازیکن را جمع می‌کنیم."
      },
      {
        "prompt": "نام تیم میزبان و مهمان هر بازی.",
        "sql": "SELECT g.GID,h.Name AS Home,a.Name AS Away\nFROM GAME g JOIN TEAM h ON h.TID=g.HomeID\nJOIN TEAM a ON a.TID=g.AwayID;",
        "why": "جدول TEAM دو بار با دو نقش استفاده می‌شود."
      }
    ],
    "source": "اقتباس و محدودسازی از databases-ramaz.pdf، تمرین ۷٫۲۲، صفحهٔ PDF ۲۶۶. تاریخچهٔ تغییر تیم خارج از فرض این سؤال است.",
    "lesson": "ممکن است تیم 20 بازیکن داشته باشد ولی فقط 11 نفر در بازی حاضر شوند. برای همین حضور را جدا ثبت می‌کنیم.",
    "trap": "قانون تعلق بازیکن به یکی از دو تیم بازی از FKهای ساده نتیجه نمی‌شود و باید جدا اعمال شود.",
    "diagram": "diagrams/medium-5.svg",
    "entities": [
      [
        "t",
        "تیم",
        [
          "#TID",
          "Name"
        ]
      ],
      [
        "p",
        "بازیکن",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "g",
        "بازی",
        [
          "#GID",
          "PlayDate"
        ]
      ]
    ],
    "relations": [
      [
        "عضویت",
        [
          [
            "p",
            "(1,1)"
          ],
          [
            "t",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "میزبان",
        [
          [
            "g",
            "(1,1)"
          ],
          [
            "t",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "مهمان",
        [
          [
            "g",
            "(1,1)"
          ],
          [
            "t",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "حضور",
        [
          [
            "p",
            "(0,N)"
          ],
          [
            "g",
            "(0,N)"
          ]
        ],
        [
          "Goals"
        ]
      ]
    ]
  },
  {
    "id": "medium-6",
    "level": "medium",
    "title": "درمانگاه؛ هر نوبت یک رخداد",
    "scenario": "هر بیمار و هر پزشک شماره و نام دارند. هر نوبت شمارهٔ مستقل، یک بیمار، یک پزشک، تاریخ و مبلغ دارد. همان بیمار ممکن است چند بار پیش همان پزشک برود. نسخهٔ سادهٔ این سؤال فقط مبلغ نوبت را نگه می‌دارد.",
    "schema": "PATIENT(PID, Name)\n  PK: PID\nDOCTOR(DID, Name)\n  PK: DID\nVISIT(VID, PID, DID, VisitDate, Fee)\n  PK: VID\n  FK: PID → PATIENT(PID)\n  FK: DID → DOCTOR(DID)\n  NOT NULL: PID, DID, VisitDate",
    "reason": "جفت بیمار و پزشک می‌تواند بارها تکرار شود. شمارهٔ نوبت هر رخداد را جدا می‌کند؛ VID در این طرح سراسری است و موجودیت نوبت قوی است.",
    "queries": [
      {
        "prompt": "نام بیمارانی که در 2026-11-19 نوبت دارند.",
        "sql": "SELECT DISTINCT p.PID,p.Name FROM PATIENT p\nJOIN VISIT v ON v.PID=p.PID WHERE v.VisitDate='2026-11-19';",
        "why": "ممکن است یک بیمار در آن روز دو نوبت داشته باشد؛ DISTINCT جفت شماره و نام را یک بار نشان می‌دهد."
      },
      {
        "prompt": "پزشکان با بیش از 3 نوبت در کل.",
        "sql": "SELECT d.DID,d.Name FROM DOCTOR d JOIN VISIT v ON v.DID=d.DID\nGROUP BY d.DID,d.Name HAVING COUNT(*)>3;",
        "why": "گروه برای هر پزشک ساخته می‌شود، سپس تعداد نوبت‌هایش شرط می‌خورد."
      },
      {
        "prompt": "مجموع هزینهٔ نوبت‌های بیمار 1؛ اگر نوبت ندارد صفر بده.",
        "sql": "SELECT COALESCE(SUM(Fee),0) AS Total FROM VISIT WHERE PID=1;",
        "why": "SUM روی مجموعهٔ خالی NULL می‌دهد. COALESCE اولین مقدار معلوم، اینجا صفر، را جایگزین می‌کند."
      }
    ],
    "source": "اقتباس آزاد از مطالعهٔ موردی درمانگاه در Database Design Step by Step، صفحات PDF ۲۵۷–۲۵۹؛ صورت کوتاه و کوئری‌ها تألیف شده‌اند.",
    "lesson": "علی دوشنبه و پنجشنبه پیش همان پزشک رفته. هر بار یک برگهٔ نوبت داریم و هر برگه شمارهٔ خودش را دارد.",
    "trap": "شمارهٔ بیمار و پزشک را به‌تنهایی کلید مرکب نکن؛ مراجعهٔ تکراری حذف می‌شود.",
    "diagram": "diagrams/medium-6.svg",
    "entities": [
      [
        "p",
        "بیمار",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "d",
        "پزشک",
        [
          "#DID",
          "Name"
        ]
      ],
      [
        "v",
        "نوبت",
        [
          "#VID",
          "VisitDate",
          "Fee"
        ]
      ]
    ],
    "relations": [
      [
        "مراجعه",
        [
          [
            "p",
            "(0,N)"
          ],
          [
            "v",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "معاینه",
        [
          [
            "d",
            "(0,N)"
          ],
          [
            "v",
            "(1,1)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "hard-1",
    "level": "hard",
    "title": "ارسال قطعه برای پروژه؛ سه‌تایی",
    "scenario": "هر تأمین‌کننده چند نوع قطعه را برای چند پروژه می‌فرستد. برای هر تأمین‌کننده، قطعه، پروژه و تاریخ حداکثر یک ارسال داریم و تعداد مثبت ثبت می‌شود. اطلاعِ «علی پیچ می‌دهد» به‌تنهایی نمی‌گوید پیچ پروژهٔ مدرسه را او داده است.",
    "schema": "SUPPLIER(SID, Name)\n  PK: SID\nPART(PID, Name)\n  PK: PID\nPROJECT(JID, Name)\n  PK: JID\nSHIP(SID, PID, JID, ShipDate, Qty)\n  PK: (SID, PID, JID, ShipDate)\n  FK: SID → SUPPLIER(SID)\n  FK: PID → PART(PID)\n  FK: JID → PROJECT(JID)\n  CHECK: Qty > 0",
    "reason": "یک لوزی به هر سه موجودیت وصل است. نوبت‌های تکراریِ هر سه‌تایی در تاریخ‌های مختلف ثبت می‌شوند؛ در ER نوبت ارسال را مرکب چندمقداری بگیر. تاریخ، رکوردهای تکراری سه شماره را جدا می‌کند.",
    "queries": [
      {
        "prompt": "تأمین‌کنندگان با بیش از 100 عدد قطعهٔ 2 برای پروژهٔ 1.",
        "sql": "SELECT s.SID,s.Name FROM SUPPLIER s JOIN SHIP x ON x.SID=s.SID\nWHERE x.PID=2 AND x.JID=1\nGROUP BY s.SID,s.Name HAVING SUM(x.Qty)>100;",
        "why": "شرط قطعه و پروژه روی سطر است؛ شرط جمع روی گروه."
      },
      {
        "prompt": "شمارهٔ تأمین‌کنندگان پروژهٔ 1 که در پروژهٔ 2 هم حضور دارند.",
        "sql": "SELECT SID FROM SHIP WHERE JID=1\nINTERSECT\nSELECT SID FROM SHIP WHERE JID=2;",
        "why": "اشتراک دو مجموعه یعنی شماره باید در هر دو باشد."
      },
      {
        "prompt": "شمارهٔ کسانی که پروژهٔ 1 را تأمین کرده‌اند ولی پروژهٔ 2 را نه.",
        "sql": "SELECT SID FROM SHIP WHERE JID=1\nEXCEPT\nSELECT SID FROM SHIP WHERE JID=2;",
        "why": "جهت EXCEPT مهم است؛ مجموعهٔ اول منهای دوم."
      }
    ],
    "source": "تألیف بر اساس الگوی تأمین قطعه و روابط سه‌تایی در جزوهٔ مدل‌سازی شما، صفحهٔ ۳۳؛ مرور مفهومی در databases-ramaz.pdf، فصل ۷ و فصل ۹. مرجع کنترل SQL: Learning PostgreSQL، فصل ۵، صفحات چاپی ۱۴۳–۱۸۹.",
    "lesson": "برای تعیین چندیِ تأمین‌کننده، یک قطعه و یک پروژه را ثابت بگیر. بعد بپرس این جفت چند تأمین‌کننده دارد. همین کار را برای دو طرف دیگر هم تکرار کن.",
    "trap": "سه ارتباط دوتایی مستقل، ترکیب واقعیِ «چه کسی چه چیزی برای کجا» را تضمین نمی‌کنند.",
    "diagram": "diagrams/hard-1.svg",
    "entities": [
      [
        "s",
        "تأمین‌کننده",
        [
          "#SID",
          "Name"
        ]
      ],
      [
        "p",
        "قطعه",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "j",
        "پروژه",
        [
          "#JID",
          "Name"
        ]
      ]
    ],
    "relations": [
      [
        "ارسال",
        [
          [
            "s",
            "چند"
          ],
          [
            "p",
            "چند"
          ],
          [
            "j",
            "چند"
          ]
        ],
        [
          "نوبت ارسال: Date + Qty"
        ]
      ]
    ]
  },
  {
    "id": "hard-2",
    "level": "hard",
    "title": "کارمند رسمی، پیمانی و دانشجو",
    "scenario": "هر کارمند دقیقاً رسمی یا پیمانی است. رسمی سال استخدام و پیمانی تاریخ پایان دارد. شخص ممکن است هم کارمند و هم دانشجو باشد. برای دانشجوـکارمند سقف ساعت کار ثبت می‌کنیم. شمارهٔ دانشجویی و شمارهٔ کارمندی هرکدام یکتا و برای یک نفر قابل تطبیق‌اند.",
    "schema": "EMP(EID, Name)\n  PK: EID\nOFFICIAL(EID, HireYear)\n  PK/FK: EID → EMP(EID)\nCONTRACT(EID, EndDate)\n  PK/FK: EID → EMP(EID)\nSTUDENT(SID, Name)\n  PK: SID\nSTEM(EID, SID, MaxHours)\n  PK: EID\n  FK: EID → EMP(EID)\n  FK: SID → STUDENT(SID)\n  UNIQUE, NOT NULL: SID\nقاعده: هر EMP دقیقاً در یکی از OFFICIAL یا CONTRACT است.",
    "reason": "کارمند ابرنوع است. رسمی و پیمانی کامل و مجزا هستند: دو خط و D. STEM زیرنوع مشترک است و باید در هر دو جدول کارمند و دانشجو نمونه داشته باشد.",
    "queries": [
      {
        "prompt": "نام پیمانی‌های دانشجو با سقف ساعت کمتر از 20.",
        "sql": "SELECT e.Name FROM EMP e JOIN CONTRACT c ON c.EID=e.EID\nJOIN STEM st ON st.EID=e.EID WHERE st.MaxHours<20;",
        "why": "وجود در CONTRACT پیمانی بودن و وجود در STEM هر دو نقش را ثابت می‌کند."
      },
      {
        "prompt": "تعداد رسمی‌ها و پیمانی‌ها به تفکیک نوع.",
        "sql": "SELECT 'official' AS Kind,COUNT(*) AS N FROM OFFICIAL\nUNION ALL\nSELECT 'contract',COUNT(*) FROM CONTRACT;",
        "why": "دو نتیجه با برچسب جدا کنار هم می‌آیند."
      },
      {
        "prompt": "کارمندانی که عضو هیچ‌یک از دو زیرنوع نیستند؛ برای کنترل خطای داده.",
        "sql": "SELECT e.EID FROM EMP e\nWHERE NOT EXISTS (SELECT 1 FROM OFFICIAL o WHERE o.EID=e.EID)\nAND NOT EXISTS (SELECT 1 FROM CONTRACT c WHERE c.EID=e.EID);",
        "why": "در دادهٔ سازگار با تخصیص کامل، جواب باید خالی باشد."
      }
    ],
    "source": "بازطراحی آموزشی بر اساس مباحث shared subclass در databases-ramaz.pdf، فصل ۸، و روش‌های نگاشت فصل ۹؛ نام‌ها و کوئری‌ها تألیف شده‌اند.",
    "lesson": "دانشجوـکارمند یعنی هم دانشجو و هم کارمند. زیرنوع می‌تواند صفت ویژهٔ خودش مثل MaxHours هم داشته باشد. اگر یک نفر چند نقش شغلی داشته باشد، O به‌جای D مطرح می‌شود.",
    "trap": "داشتن FK به EMP به‌تنهایی کامل و مجزا بودن رسمی/پیمانی را اجرا نمی‌کند؛ قاعدهٔ بین جدول‌ها جداست.",
    "diagram": "diagrams/hard-2.svg",
    "entities": [
      [
        "e",
        "کارمند",
        [
          "#EID",
          "Name"
        ]
      ],
      [
        "o",
        "رسمی",
        [
          "HireYear"
        ]
      ],
      [
        "c",
        "پیمانی",
        [
          "EndDate"
        ]
      ],
      [
        "s",
        "دانشجو",
        [
          "#SID",
          "Name"
        ]
      ],
      [
        "se",
        "دانشجوـکارمند",
        [
          "MaxHours"
        ]
      ]
    ],
    "relations": []
  },
  {
    "id": "hard-3",
    "level": "hard",
    "title": "بانک و دانشگاه؛ دسته و انتقال وجه",
    "scenario": "صاحب حساب می‌تواند شخص یا دانشگاه باشد و فقط بعضی از آن‌ها حساب دارند. هر حساب یک صاحب و یک بانک نگهدارنده دارد. عملیات شماره، زمان و مبلغ مثبت دارد و دقیقاً واریز یا برداشت یا انتقال است. هر واریز یک مقصد، برداشت یک مبدأ و انتقال یک مبدأ و یک مقصد متفاوت دارد.",
    "schema": "OWNER(OID)\n  PK: OID\nPERSON(PID, Name, OID)\n  PK: PID\n  FK: OID → OWNER(OID)\n  UNIQUE: OID\nUNIVERSITY(UID, Name, OID)\n  PK: UID\n  FK: OID → OWNER(OID)\n  UNIQUE: OID\nBANK(BID, Name)\n  PK: BID\nACCOUNT(AID, OID, BID, Balance)\n  PK: AID\n  FK: OID → OWNER(OID)\n  FK: BID → BANK(BID)\nOPERATION(XID, AtTime, Amount)\n  PK: XID\nDEPOSIT(XID, DestAID)\n  PK/FK: XID → OPERATION(XID)\n  FK: DestAID → ACCOUNT(AID)\nWITHDRAWAL(XID, SourceAID)\n  PK/FK: XID → OPERATION(XID)\n  FK: SourceAID → ACCOUNT(AID)\nTRANSFER(XID, SourceAID, DestAID)\n  PK/FK: XID → OPERATION(XID)\n  FK: SourceAID → ACCOUNT(AID)\n  FK: DestAID → ACCOUNT(AID)\n  CHECK: SourceAID <> DestAID\nقواعد: مالک دقیقاً شخص یا دانشگاه است؛ عملیات دقیقاً یک زیرنوع دارد؛ مبلغ مثبت؛ حساب‌ها و ارجاع‌های هر عملیات اجباری‌اند.",
    "reason": "U یعنی انتخاب از شخص یا دانشگاه. برای دسته شمارهٔ جدید OID داریم. در انتقال یک حساب در نقش مبدأ و یکی در نقش مقصد است؛ هر انتقال یک رخداد مستقل است.",
    "queries": [
      {
        "prompt": "مجموع واریزی به هر حسابی که واریز دارد.",
        "sql": "SELECT d.DestAID,SUM(o.Amount) AS Total\nFROM DEPOSIT d JOIN OPERATION o ON o.XID=d.XID\nGROUP BY d.DestAID;",
        "why": "مبلغ در جدول عمومی عملیات است؛ مقصد در زیرنوع واریز."
      },
      {
        "prompt": "شمارهٔ انتقال، مبدأ و مقصد برای انتقال‌های بیش از 1000.",
        "sql": "SELECT t.XID,t.SourceAID,t.DestAID FROM TRANSFER t\nJOIN OPERATION o ON o.XID=t.XID WHERE o.Amount>1000;",
        "why": "مبلغ مشترک را از OPERATION می‌خوانیم."
      },
      {
        "prompt": "حساب‌هایی که هیچ انتقال خروجی ندارند.",
        "sql": "SELECT a.AID FROM ACCOUNT a WHERE NOT EXISTS\n(SELECT 1 FROM TRANSFER t WHERE t.SourceAID=a.AID);",
        "why": "فقط نقش مبدأ را چک کن؛ دریافت انتقال مانع آمدن حساب در جواب نیست."
      }
    ],
    "source": "تألیف بر اساس تمرین صفحهٔ ۵۵ جزوهٔ مدل‌سازی شما؛ مرجع دسته در databases-ramaz.pdf، فصل ۸. انتقال و قواعد سازگاری برای تمرین افزوده شده‌اند.",
    "lesson": "بدون U هم می‌توانی طرف حساب را ابرنوع بگیری و شخص و دانشگاه را زیرنوع‌هایش بگذاری. برای کل‌وجزء، اگر حساب کارت‌های دارای شمارهٔ مستقل داشته باشد، کارت یک موجودیت با FK به حساب است و شمارهٔ حساب جزئی از PK کارت نمی‌شود.",
    "trap": "ثبت انتقال با کم‌کردن مبدأ و افزودن مقصد باید یک تراکنش باشد. CHECK ساده به‌تنهایی موجودی کافی و هم‌زمانی دو تغییر را تضمین نمی‌کند.",
    "diagram": "diagrams/hard-3.svg",
    "entities": [
      [
        "p",
        "شخص",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "u",
        "دانشگاه",
        [
          "#UID",
          "Name"
        ]
      ],
      [
        "o",
        "صاحب حساب",
        [
          "#OID"
        ]
      ],
      [
        "b",
        "بانک",
        [
          "#BID",
          "Name"
        ]
      ],
      [
        "a",
        "حساب",
        [
          "#AID",
          "Balance"
        ]
      ],
      [
        "x",
        "عملیات",
        [
          "#XID",
          "AtTime",
          "Amount"
        ]
      ],
      [
        "d",
        "واریز",
        []
      ],
      [
        "w",
        "برداشت",
        []
      ],
      [
        "t",
        "انتقال",
        []
      ]
    ],
    "relations": [
      [
        "مالکیت",
        [
          [
            "o",
            "(0,N)"
          ],
          [
            "a",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "نگهداری",
        [
          [
            "b",
            "(0,N)"
          ],
          [
            "a",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "مقصد واریز",
        [
          [
            "d",
            "(1,1)"
          ],
          [
            "a",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "مبدأ برداشت",
        [
          [
            "w",
            "(1,1)"
          ],
          [
            "a",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "مبدأ انتقال",
        [
          [
            "t",
            "(1,1)"
          ],
          [
            "a",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "مقصد انتقال",
        [
          [
            "t",
            "(1,1)"
          ],
          [
            "a",
            "(0,N)"
          ]
        ],
        []
      ]
    ]
  },
  {
    "id": "hard-4",
    "level": "hard",
    "title": "تجمیع؛ ارزیابی کار روی پروژه",
    "scenario": "کارمند روی چند پروژه کار می‌کند و ساعت کار دارد. هر جفت کارمند و پروژه یک تخصیص است. هر ارزیاب چند تخصیص را بررسی می‌کند و هر تخصیص چند ارزیاب دارد. هر ارزیاب هر تخصیص را یک بار بررسی می‌کند و امتیاز می‌دهد.",
    "schema": "EMP(EID, Name)\n  PK: EID\nPROJECT(JID, Name)\n  PK: JID\nASSIGNMENT(EID, JID, Hours)\n  PK: (EID, JID)\n  FK: EID → EMP(EID)\n  FK: JID → PROJECT(JID)\nREVIEWER(RID, Name)\n  PK: RID\nREVIEW(EID, JID, RID, Score)\n  PK: (EID, JID, RID)\n  FK: (EID, JID) → ASSIGNMENT(EID, JID)\n  FK: RID → REVIEWER(RID)",
    "reason": "دور کارمند، لوزی تخصیص و پروژه کادر خط‌چین بکش و ارزیابی را به کل کادر وصل کن. کلید خارجی مرکب می‌گوید همین جفت باید قبلاً تخصیص داشته باشد.",
    "queries": [
      {
        "prompt": "تخصیص‌های بیش از 40 ساعت که بررسی نشده‌اند.",
        "sql": "SELECT a.EID,a.JID FROM ASSIGNMENT a WHERE a.Hours>40\nAND NOT EXISTS (SELECT 1 FROM REVIEW r\nWHERE r.EID=a.EID AND r.JID=a.JID);",
        "why": "هر دو جزء جفت را مقایسه کن؛ بررسیِ پروژهٔ دیگرِ همان کارمند کافی نیست."
      },
      {
        "prompt": "تخصیص‌هایی با میانگین امتیاز دست‌کم 18.",
        "sql": "SELECT EID,JID,AVG(Score) AS Average FROM REVIEW\nGROUP BY EID,JID HAVING AVG(Score)>=18;",
        "why": "هر جفت یک گروه می‌شود و امتیاز ارزیاب‌ها میانگین گرفته می‌شود."
      },
      {
        "prompt": "تعداد بررسی‌های هر ارزیاب، شامل صفر.",
        "sql": "SELECT r.RID,r.Name,COUNT(v.EID) AS N\nFROM REVIEWER r LEFT JOIN REVIEW v ON v.RID=r.RID\nGROUP BY r.RID,r.Name;",
        "why": "با LEFT JOIN ارزیاب بی‌بررسی هم می‌ماند. EID در REVIEW همیشه معلوم است."
      }
    ],
    "source": "بازطراحی از تکنیک تجمیعِ صفحات ۶۱–۶۲ جزوهٔ مدل‌سازی شما؛ زمینهٔ COMPANY از databases-ramaz.pdf، فصل ۷. سؤال و حل تألیف شده‌اند.",
    "lesson": "رضا کارِ علی روی پروژهٔ 7 را بررسی می‌کند. ممکن است کارِ علی روی پروژهٔ 8 هنوز بررسی نشده باشد. کادر، همین اتفاق مشخص را یک واحد قابل‌ارجاع می‌کند.",
    "trap": "در هر کادر تجمیع یک رابطه است. چند موجودیت می‌توانند شرکت‌کنندهٔ همان یک رابطه باشند.",
    "diagram": "diagrams/hard-4.svg",
    "entities": [
      [
        "e",
        "کارمند",
        [
          "#EID",
          "Name"
        ]
      ],
      [
        "p",
        "پروژه",
        [
          "#JID",
          "Name"
        ]
      ],
      [
        "r",
        "ارزیاب",
        [
          "#RID",
          "Name"
        ]
      ]
    ],
    "relations": [
      [
        "تخصیص",
        [
          [
            "e",
            "(0,N)"
          ],
          [
            "p",
            "(0,N)"
          ]
        ],
        [
          "Hours"
        ]
      ]
    ]
  },
  {
    "id": "hard-5",
    "level": "hard",
    "title": "همهٔ درس‌های اجباری؛ سؤال همه",
    "scenario": "هر رشته چند درس اجباری دارد و هر درس ممکن است برای چند رشته اجباری باشد. هر دانشجو عضو یک رشته است و می‌تواند چند درس را بگذراند. در این مدل برای هر جفت دانشجو و درس فقط نتیجهٔ نهایی نگهداری می‌شود. نمرهٔ قبولی حداقل 10 است.",
    "schema": "MAJOR(MID, Name)\n  PK: MID\nSTUDENT(SID, Name, MID)\n  PK: SID\n  FK: MID → MAJOR(MID)\nCOURSE(CID, Title)\n  PK: CID\nREQUIRED(MID, CID)\n  PK: (MID, CID)\n  FK: MID → MAJOR(MID)\n  FK: CID → COURSE(CID)\nRESULT(SID, CID, Grade)\n  PK: (SID, CID)\n  FK: SID → STUDENT(SID)\n  FK: CID → COURSE(CID)",
    "reason": "درس‌های اجباری هر رشته یک مجموعه‌اند. برای هر دانشجو می‌پرسیم آیا حتی یک درس اجباری مانده که قبولی آن را ندارد؟ اگر نمانده، همه را گذرانده.",
    "queries": [
      {
        "prompt": "دانشجویانی که همهٔ درس‌های اجباری رشتهٔ خود را پاس کرده‌اند.",
        "sql": "SELECT s.SID,s.Name FROM STUDENT s\nWHERE NOT EXISTS (\n  SELECT 1 FROM REQUIRED r WHERE r.MID=s.MID\n  AND NOT EXISTS (SELECT 1 FROM RESULT x\n    WHERE x.SID=s.SID AND x.CID=r.CID AND x.Grade>=10)\n);",
        "why": "بیرونی می‌گوید هیچ درس اجباریِ بدون قبولی وجود نداشته باشد. اگر رشته هیچ درس اجباری ندارد، همهٔ دانشجویان آن رشته طبق این تعریف قبول‌اند."
      },
      {
        "prompt": "شمارهٔ دانشجویانی که نمره‌شان از میانگین کل نمره‌های معلوم کمتر است.",
        "sql": "SELECT DISTINCT SID FROM RESULT\nWHERE Grade < (SELECT AVG(Grade) FROM RESULT);",
        "why": "زیرپرسش یک عدد می‌دهد؛ با مقایسهٔ معمولی کافی است."
      },
      {
        "prompt": "دانشجویانی که یک نمرهٔ کمتر از 10 دارند.",
        "sql": "SELECT s.Name FROM STUDENT s WHERE EXISTS\n(SELECT 1 FROM RESULT r WHERE r.SID=s.SID AND r.Grade<10);",
        "why": "حداقل یک مردودی را پیدا می‌کنیم؛ NULL به‌تنهایی مردودیِ عددی محسوب نمی‌شود."
      }
    ],
    "source": "اقتباس مفهومی از سؤال «کارمندانی که روی همهٔ پروژه‌ها کار می‌کنند»، databases-ramaz.pdf، تمرین ۶٫۱۶(e)، صفحهٔ PDF ۲۱۷؛ تبدیل زمینه به دانشگاه و حل SQL تألیفی است.",
    "lesson": "برای فهمیدن «همه»، دنبال چیزی بگرد که جا مانده. اگر هیچ مورد جامانده‌ای پیدا نشد، همه کامل‌اند. دو NOT EXISTS همین جمله را پیاده می‌کنند.",
    "trap": "فقط تعداد قبولی‌ها را با تعداد اجباری‌ها مقایسه نکن؛ ممکن است درس‌های اختیاری پاس شده باشند.",
    "diagram": "diagrams/hard-5.svg",
    "entities": [
      [
        "m",
        "رشته",
        [
          "#MID",
          "Name"
        ]
      ],
      [
        "s",
        "دانشجو",
        [
          "#SID",
          "Name"
        ]
      ],
      [
        "c",
        "درس",
        [
          "#CID",
          "Title"
        ]
      ]
    ],
    "relations": [
      [
        "عضویت",
        [
          [
            "s",
            "(1,1)"
          ],
          [
            "m",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "اجباری",
        [
          [
            "m",
            "(0,N)"
          ],
          [
            "c",
            "(0,N)"
          ]
        ],
        []
      ],
      [
        "نتیجه",
        [
          [
            "s",
            "(0,N)"
          ],
          [
            "c",
            "(0,N)"
          ]
        ],
        [
          "Grade"
        ]
      ]
    ]
  },
  {
    "id": "hard-6",
    "level": "hard",
    "title": "مسئول گروه، عضو گروه و استاد مدعو",
    "scenario": "هر استاد دقیقاً عضو یک گروه است؛ تاریخ عضویت دارد. هر گروه دقیقاً یک مدیر دارد و هر استاد حداکثر مدیر یک گروه است. گروه‌ها استادان را برای یک درس در سال و ترم دعوت می‌کنند. همان استاد برای همان درس از همان گروه می‌تواند در ترم بعد دوباره دعوت شود.",
    "schema": "PROF(PID, Name, HomeDID, SinceDate)\n  PK: PID\n  FK: HomeDID → DEPT(DID)\n  NOT NULL: HomeDID\nDEPT(DID, Name, ManagerID)\n  PK: DID\n  FK: ManagerID → PROF(PID)\n  UNIQUE, NOT NULL: ManagerID\nCOURSE(CID, Title)\n  PK: CID\nINVITED(DID, PID, CID, Year, Term, Status)\n  PK: (DID, PID, CID, Year, Term)\n  FK: DID → DEPT(DID)\n  FK: PID → PROF(PID)\n  FK: CID → COURSE(CID)",
    "reason": "سه رابطهٔ متفاوت را جدا بخوان. شمارهٔ گروهِ عضویت در PROF است، شمارهٔ مدیر در DEPT است، و دعوت برای گروه/استاد/درس جدول جدا دارد. برای ایجاد DDL ارجاع حلقه‌ای را می‌توان بعد از ساخت جدول‌ها با ALTER اضافه کرد.",
    "queries": [
      {
        "prompt": "نام استاد، گروه دعوت‌کننده و درس برای ترم 2 سال 2026.",
        "sql": "SELECT p.Name,d.Name AS Host,c.Title FROM INVITED i\nJOIN PROF p ON p.PID=i.PID JOIN DEPT d ON d.DID=i.DID\nJOIN COURSE c ON c.CID=i.CID\nWHERE i.Year=2026 AND i.Term=2;",
        "why": "گروه میزبان از i.DID می‌آید؛ p.HomeDID گروه عضویت استاد است."
      },
      {
        "prompt": "دعوت‌های همان ترم را برای اعضای گروه 11 تأیید کن.",
        "sql": "UPDATE INVITED SET Status='approved'\nWHERE Year=2026 AND Term=2\nAND PID IN (SELECT PID FROM PROF WHERE HomeDID=11);",
        "why": "زیرپرسش استادهای عضو گروه 11 را پیدا می‌کند؛ مقصد دعوت می‌تواند گروه دیگری باشد."
      },
      {
        "prompt": "دعوت استاد 10 برای درس 3 از گروه 20 در همان ترم را حذف کن.",
        "sql": "DELETE FROM INVITED WHERE DID=20 AND PID=10 AND CID=3\nAND Year=2026 AND Term=2;",
        "why": "تمام جزءهای کلید را در شرط گذاشتیم تا فقط یک دعوت حذف شود."
      }
    ],
    "source": "اقتباس و اصلاح آموزشی از جزوهٔ طراحی منطقی شما، صفحات ۴۷–۴۸؛ رابطهٔ سه‌تایی با الگوی تمرین ۷٫۲۵ در databases-ramaz.pdf، صفحهٔ PDF ۲۶۸ تطبیق داده شده است.",
    "lesson": "ممکن است رضایی عضو گروه ریاضی، مدیر همان گروه و مدعو کامپیوتر برای پایگاه داده باشد. یک شمارهٔ گروه برای همهٔ این نقش‌ها کافی نیست.",
    "trap": "کوئری UPDATE بدون Year و Term می‌تواند تاریخچهٔ دعوت‌ها را هم تغییر بدهد. اسم نقش‌ها را واضح بنویس.",
    "diagram": "diagrams/hard-6.svg",
    "entities": [
      [
        "p",
        "استاد",
        [
          "#PID",
          "Name"
        ]
      ],
      [
        "d",
        "گروه",
        [
          "#DID",
          "Name"
        ]
      ],
      [
        "c",
        "درس",
        [
          "#CID",
          "Title"
        ]
      ]
    ],
    "relations": [
      [
        "عضویت",
        [
          [
            "p",
            "(1,1)"
          ],
          [
            "d",
            "(0,N)"
          ]
        ],
        [
          "SinceDate"
        ]
      ],
      [
        "مدیریت",
        [
          [
            "p",
            "(0,1)"
          ],
          [
            "d",
            "(1,1)"
          ]
        ],
        []
      ],
      [
        "دعوت",
        [
          [
            "p",
            "چند"
          ],
          [
            "d",
            "چند"
          ],
          [
            "c",
            "چند"
          ]
        ],
        [
          "نوبت: Year + Term"
        ]
      ]
    ]
  }
];
