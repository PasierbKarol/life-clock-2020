export class AppConstants {

  public static LIFE_CLOCK = 'life-clock';
  public static FIVE_YEARS = 'five-years';
  public static TWO_YEARS = 'two-years';
  public static ONE_YEAR = 'one-year';
  public static SIX_MONTHS = 'six-months';
  public static THREE_MONTHS = 'three-months';
  public static ONE_MONTH = 'one-month';

  private static lifeClockEN = {
    goalBlocks: [
      {
        description: 'This is the list of your goals for the next 5 years. What would you like to achieve in that time? ' +
          'Please drag these goals from the main list into this box.' +
          '\nPlease drag here those goals which are important in next 5 years.',
        title: '5 Years Priorities',
        id: AppConstants.FIVE_YEARS
      },
      {
        description: 'This is the list of your goals for the next 2 years. What would you like to achieve in that time? ' +
          'Please drag these goals from the main list or from 5 years list into this box.' +
          '\nPlease drag here those goals which are important in next 2 years.',
        title: '2 Years Priorities',
        id: AppConstants.TWO_YEARS
      },
      {
        description: 'This is the list of your goals for the next year. What would you like to achieve in that time? ' +
          'Please drag these goals from any lists above into this box.' +
          'Have you ever gave enough thought to what you want to do next year? ' +
          'What would so important and crucial to do first? What would make you happy to accomplish and achieve?\n' +
          '\nPlease drag here those goals which are important in next year.',
        title: '1 Year Priorities',
        id: AppConstants.ONE_YEAR
      },
      {
        description: 'This is the list of your goals for the next 6 months. What would you like to achieve in that time? ' +
          'Please drag these goals from any lists above into this box.' +
          'Do you really know what matters to you most in next 6 months? Think of it as everything else doesn\'t matter.' +
          '\nPlease drag here those goals which are important in next 6 months.',
        title: '6 Months Priorities',
        id: AppConstants.SIX_MONTHS
      },
      {
        description: 'This is the list of your goals for the next 3 months. What would you like to achieve in that time? ' +
          'Please drag these goals from any lists above into this box. Remember you can reorganise it all.' +
          'Imagine as this could be the only last 3 months you have to live. Like Greg.\n' +
          'What would you prefer to do to make your life happy and never regret you haven\'t done something you dreamed of? ' +
          'Now you have a chance to realize it and just do it!' +
          '\nPlease drag here those goals which are important in next 3 months.',
        title: '3 Months Priorities',
        id: AppConstants.THREE_MONTHS
      },
      {
        description: 'This is the last box. Most important things you ever thought of.' +
          'The list of your goals for the next month. What would you like to achieve in that time? ' +
          'Please drag these goals from any lists above into this box. Remember you can reorganise it all.' +
          '\nPlease drag here those goals which are important in next month.',
        title: '1 Month Priorities',
        id: AppConstants.ONE_MONTH
      },
    ],
    introduction_title: 'Life Goals Priorities',
    introduction:
      'Greg Hartle is someone I want to tell you about. He needed kidney transplant and fortunately was able to get one. ' +
      'Everything seemed to be just fine. Then, in his mid 20\'s, he found out that kidney was rejected ' +
      'and he\'d have to wait in line for the next one. Problem was, that doctors didn\'t give him enough time to live to get it.\n' +
      'Greg was told the time he had left. Successful young entrepreneur with big ambition suddenly taken down by such news. ' +
      'But he didn\'t give up. He decided to fight and continue working hard, but he had to come up with new approach to all things. ' +
      'That\'s how he created life clock. Cannot say for sure if it\'s his idea alone, however this page is based on it. ' +
      'This idea was presented on ALIVE conference in Berlin.',
    introduction_middle:
      'There is one undeniable truth about all of us:\n' +
      'WE ALL are dying! WE ALL are going to die!\n' +
      'No one can escape that.\n' +
      'As much as we do not want to think about it, it\'s plain obvious and it creeps onto us every second. The question is:\n' +
      '\n' +
      'What are we going to do about this? Don\'t get me wrong! ' +
      'This page is not suppose to demotivate you and make you thinking about the end of our life and all the sad things. ' +
      'Sadly it\'s inevitable, and it\'s up to us, how are we going to approach this. This page should help you with this.\n' +
      '\n' +
      'We all should remember the time is the only thing we can never get back and every day we\'re getting older.',
    introduction_final:
      'This exercise allows you to write down your goals and any things you\'d love to do in your life. ' +
      'You may write as many as you wish. Then you should follow the instructions to segregate those goals and prioritize them. ' +
      'Having in mind you may die unexpectedly. Therefore, try to think about those goals as things you want to do most before you die.\n' +
      'Which ones you\'d do first as in case if you\'d die, you could think you\'re dying happy, ' +
      'as you have accomplished what you have always dreamed of. Or at least big part of it.\n' +
      'In the box below write down your list. Please separate each thing with enter key as you would do in any text editor.\n' +
      'Once finished please press the button below and follow the instructions. ' +
      'There will be some new elements on the page. The goal in here is to segregate your life list in a way which will help you, ' +
      'to find out what is most important and when you think you should do it.',
    list_instructions:
      'All your goals are now included in the list below. You can use the mouse to drag every one of them and move around. ' +
      'However, they can be dropped only into the boxes like the one on the right.',
    final_summary:
      'You are at the final step. You have written your goals and organized them depending on their priority. ' +
      'Now you can take a look once more, go through all of them again to assure yourself this is the correct order of your dreams.\n' +
      'You may still make some changes and drag goals between any of those boxes. ' +
      'Remember, this is all for you to help you make best choices. ' +
      'To prioritize your dreams that way, so you would never regret you did something easy and simple, ' +
      'rather than something great you always wanted to do.\n' +
      'And once you prioritize your dreams then simply DO THEM. And check this great video: DO IT!!!.\n' +
      'Below is the submit button. At the moment it allows you to send the results to your email. ' +
      'When you\'ll press it your list will be saved.'
  };

  private static importancePL = 'Co takiego ważnego jest do osiągnięcia w tym czasie? ' +
    'Na czym najbardziej Ci zależy? Co da Ci najwięcej wartości? Co przyniesie najwiecej satysfakcji i zadowolenia? ' +
    'Wykorzystaj cele ze wszystkich okien i rozdysponuj je ponownie.';

  private static lifeClockPL = {
    goalBlocks: [
      {
        description:
          'To jest lista Twoich celów na kolejne 5 lat. ' + AppConstants.importancePL +
          '\nPrzeciągnij tutaj cele, które są dla Ciebie ważne w ciągu kolejnych 5 latach.',
        title: 'Cele na następne 5 lat',
        id: 'five-years'
      },
      {
        description:
          'To jest lista Twoich celów na kolejne 2 lata. Ponownie zadaj sobie następujące pytania. ' + AppConstants.importancePL +
          '\nPrzeciągnij tutaj cele, które są dla Ciebie ważne w ciągu kolejnych 2 latach.',
        title: 'Cele na następne 2 lata',
        id: 'two-years'
      },
      {
        description:
          'Ponownie zadaj sobie następujące pytania. ' + AppConstants.importancePL +
          '\nNaprawdę dobrze się zastanów, co jest najważniejsze i ponownie zreorganizuj wszystkie swoje cele\n' +
          '\nPrzeciągnij tutaj cele, które są dla Ciebie ważne w ciągu kolejnego roku.',
        title: 'Cele na następny rok',
        id: 'one-year'
      },
      {
        description:
          'Ponownie zadaj sobie następujące pytania. ' + AppConstants.importancePL +
          '\n 6 miesięcy to niedaleka przyszłość. Podejdź do tego tak, jakby nic innego nie miało znaczenia. ' +
          '\nPrzeciągnij tutaj cele, które są dla Ciebie ważne w ciągu kolejnych 6 miesięcy.',
        title: 'Cele na następne 6 miesięcy',
        id: 'six-months'
      },
      {
        description:
          '\n Wyobraź sobie, że to mogą być ostatnie 3 miesiące Twojego życia. Co sprawiłoby Ci największą radosć? ' +
          'Co przyniosłoby największe spełnienie i cudowne wspomnienia?' +
          'Wybierz rzeczy, które będą Twoimi największymi marzeniami! Takie, których wykonania nie pożałujesz nigdy. ' +
          'Teraz masz szansę naprawdę to wykonać, bo wiesz, co jest najważniejsze!!!\n' +
          AppConstants.importancePL +
          '\nPrzeciągnij tutaj cele, które są dla Ciebie ważne w ciągu kolejnych 3 miesięcy.',
        title: 'Cele na następne 3 miesiące',
        id: 'three-months'
      },
      {
        description: 'Ostatni podział. Tutaj powinno wylądować wszystko, co spełni Twoje największe marzenia. .' +
        AppConstants.importancePL +
        '\nPrzeciągnij tutaj cele, które są dla Ciebie ważne w ciągu kolejnego miesiąca.',
        title: 'Cele na kolejny miesiąc',
        id: 'one-month'
      },
    ],
    introduction_title: 'Największy priorytet w Twoim życiu',
    introduction:
      'Chciałbym opowiedzić Ci o Greg\'u Hartle. Swego czasu potrzebował transplantacji nerki i na szczęscie udało się to. ' +
      'Wszystko wydawało sie być w porządku. Niedługo potem dowiedział się, że jednak nerka się nie przyjęła. ' +
      'Musiał poczekać na kolejną. Niestety wtedy już lekarze nie dawali mu zbyt wiele czasu na przeżycie. ' +
      'Powiedziano mu, jak wiele czasu mu już zostało i żeby najlepiej się z tym pogodził. ' +
      'Greg był przedsiębiorcą, który odniosł względnie dobry sukces i nagle dowiedział się, że już po wszystkim. ' +
      'Aczkolwiek nie poddał się. Zdecydował sie kontynuować pracę i określić nowe podejście do życia. ' +
      'Wtedy wpadł na pomysł Zegara Życia (Life Clock). ' +
      'Nie jestem pewien, czy to jest w pełni jego pomysł, aczkolwiek ta strona się na nim opiera.' +
      'Greg przedstawił ten pomysł na konferencji ALIVE w Berlinie. Michał Szafrański opisywał to na swoim blogu.',
    introduction_middle:
      'Jedno jest pewne w życiu!!! Wszystkich nas czeka ten sam koniec i nikt tego nie uniknie. ' +
      'Możemy nie chcieć o tym myśleć, ani tego uznać. Jednakże tak będzie i z każdą sekundą coraz bliżej do celu.' +
      'Najważniejsze pytanie to: Co my z tym wszystkim zrobimy?' +
      'Tu nie chodzi o pesymizm i skupianie się na śmierci. ' +
      'Nie chcę nikogo demotywować ani smucić. Stwierdzam fakty. ' +
      'Niestety jest to nieunikniona częśc życia i tylko od nas zależy, co zrobimy z otrzymanym czasem i na co go przeznaczymy. ' +
      'Te narzędzie może w tym pomóc. Czas to jedyna rzecz, której nie możemy odzyskać. ' +
      'Dlatego należy jak najlepiej go wykorzystać. ',
    introduction_final:
      'Te narzędzie może pomóc Ci spisać Twoje największe cele i marzenia i inne rzeczy do zrobienia w zyciu. ' +
      'Podążaj za instrukcjami i posegreguj te cele wg ważności i czasu. Tzn które z nich należy wykonać jak najszybciej. ' +
      'Pamiętaj, że każdy z nas może umrzeć zupełnie nieoczekiwanie, w każdej chwili. ' +
      'Dlatego nalezy podejść do tych celów i marzeń, jak gdyby miały to być ostatnie rzeczy do zrobienia w życiu. ' +
      'Które musiałyby być zrealizowane jako pierwsze, aby dać Ci największą satysfakcję i zadowolenie? ' +
      'Wykonanie których z tych celów pozwoliłoby Ci umrzeć z uśmiechem? ' +
      'Na kolejnej stronie wypisz lub wklej wszystkie swoje cele i podążaj za instrukcjami.',
    list_instructions:
      'Wszystkie Twoje cele znajdują się poniżej. Mozesz przeciągać je myszką w inne miejsca. ' +
      'Natomiast mogą one być upuszczone tylko w tej liście, lub poniższych sekcjach. ' +
      'Możesz uporządkować tę listę lub od razu rozpocząć przeciąganie celów do kolejnych sekcji, wg ważności.',
    final_summary:
      'To ostatni krok. Twoje cele są uporządkowane wg ważności. ' +
      'Spójrz na nie jeszcze raz, przejrzyj wszystko i popraw jeśli trzeba, wg Twoich priorytetów. \n' +
      'Wciąż możesz dokonać zmiany, poprawić cele lub ich rozmieszczenie w poszczególnych sekcjach. ' +
      'To wszystko jest dla Ciebie i ma służyć Tobie. ' +
      'Jeśli dobrze określisz stopień ważności nie grozi Ci obawa, że nie wykonasz czegoś, co jest dla Ciebie tak bardzo ważne.' +
      '\n Kiedy już określisz te priorytety, po prostu ZRÓB TO!!! Nie czekaj na nic!.\n' +
      'Poniższy przycisk zatwierdzi Twój wybór i Twoje cele mogą zostać wysłane emailem lub zapisane jako PDF. '
  };

  public static getDescriptions(language: string) {
    if (language === 'PL') {
      return this.lifeClockPL;
    } else if (language === 'EN') {
      return this.lifeClockEN;
    }
  }
}
