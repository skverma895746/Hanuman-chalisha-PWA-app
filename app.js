/**
 * श्री हनुमान चालीसा एवं सम्पूर्ण स्तोत्र संग्रह
 * Pure Vanilla JavaScript Application Engine
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. SACRED TEXT DATA REPOSITORY (संपूर्ण प्रामाणिक पाठ डेटा)
     ========================================================================== */

  const CHALISA_DATA = {
    openingDohas: [
      {
        id: "doha-1",
        label: "दोहा १",
        lines: [
          "श्रीगुरु चरन सरोज रज निज मनु मुकुरु सुधारि।",
          "बरनउँ रघुबर बिमल जसु जो दायकु फल चारि॥"
        ],
        bhavarth: "श्री गुरुदेव के चरण कमलों की धूलि से अपने मन रूपी दर्पण को पवित्र करके, मैं श्री रघुवीर के उस निर्मल यश का वर्णन करता हूँ, जो चारों फलों (धर्म, अर्थ, काम और मोक्ष) को देने वाला है।",
        start: 0,
        end: 7
      },
      {
        id: "doha-2",
        label: "दोहा २",
        lines: [
          "बुद्धिहीन तनु जानिके, सुमिरौं पवन-कुमार।",
          "बल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार॥"
        ],
        bhavarth: "हे पवनपुत्र! मैं स्वयं को बुद्धिहीन जानकर आपका स्मरण करता हूँ। मुझे बल, बुद्धि और विद्या प्रदान कीजिए तथा मेरे समस्त क्लेशों व विकारों को दूर कीजिए।",
        start: 7,
        end: 14
      }
    ],
    chaupais: [
      {
        num: 1,
        lines: ["जय हनुमान ज्ञान गुन सागर।", "जय कपीस तिहुँ लोक उजागर॥"],
        bhavarth: "ज्ञान और गुणों के अथाह सागर श्री हनुमान जी की जय हो! तीनों लोकों में वानरश्रेष्ठ आपकी कीर्ति का दिव्य प्रकाश फैला हुआ है।",
        start: 14, end: 18
      },
      {
        num: 2,
        lines: ["राम दूत अतुलित बल धामा।", "अंजनि-पुत्र पवनसुत नामा॥"],
        bhavarth: "आप भगवान श्री राम के अनन्य दूत और अतुलनीय बल के धाम हैं। आप माता अंजना के पुत्र तथा पवनसुत नाम से विख्यात हैं।",
        start: 18, end: 22
      },
      {
        num: 3,
        lines: ["महाबीर बिक्रम बजरंगी।", "कुमति निवार सुमति के संगी॥"],
        bhavarth: "हे महावीर! आप परम पराक्रमी और वज्र के समान सुदृढ़ अंग वाले हैं। आप कुबुद्धि को दूर करने वाले और सुबुद्धि (सद्बुद्धि) के सच्चे संगी हैं।",
        start: 22, end: 26
      },
      {
        num: 4,
        lines: ["कंचन बरन बिराज सुबेसा।", "कानन कुंडल कुंचित केसा॥"],
        bhavarth: "आपका शरीर सुवर्ण के समान तेजस्वी है और आप सुंदर वस्त्रों से सुशोभित हैं। कानों में स्वर्ण कुंडल और घुंघराले बाल अत्यंत शोभायमान हैं।",
        start: 26, end: 30
      },
      {
        num: 5,
        lines: ["हाथ बज्र औ ध्वजा बिराजै।", "काँधे मूँज जनेऊ साजै॥"],
        bhavarth: "आपके एक हाथ में वज्र और दूसरे में विजय ध्वजा शोभा पा रही है। आपके कंधे पर मूंज का बना पवित्र जनेऊ सुशोभित है।",
        start: 30, end: 34
      },
      {
        num: 6,
        lines: ["संकर सुवन केसरीनंदन।", "तेज प्रताप महा जग बंदन॥"],
        bhavarth: "आप भगवान शिव के रुद्रावतार और राजा केसरी के नंदन हैं। आपके महान तेज और प्रताप की वंदना संपूर्ण संसार करता है।",
        start: 34, end: 38
      },
      {
        num: 7,
        lines: ["बिद्यावान गुनी अति चातुर।", "राम काज करिबे को आतुर॥"],
        bhavarth: "आप समस्त विद्याओं के ज्ञाता, परम गुणी और अत्यंत चतुर हैं। भगवान श्री राम के प्रत्येक कार्य को सिद्ध करने के लिए सदैव तत्पर रहते हैं।",
        start: 38, end: 42
      },
      {
        num: 8,
        lines: ["प्रभु चरित्र सुनिबे को रसिया।", "राम लखन सीता मन बसिया॥"],
        bhavarth: "आप प्रभु श्री राम के चरित्र और कथा को सुनने के रसिक हैं। श्री राम, लक्ष्मण और माता सीता आपके हृदय में सदा वास करते हैं।",
        start: 42, end: 46
      },
      {
        num: 9,
        lines: ["सूक्ष्म रूप धरि सियहिं दिखावा।", "बिकट रूप धरि लंक जरावा॥"],
        bhavarth: "आपने अति सूक्ष्म रूप धारण करके माता सीता के दर्शन किए और विकराल रूप धारण करके राक्षसों की नगरी लंका को भस्म कर दिया।",
        start: 46, end: 50
      },
      {
        num: 10,
        lines: ["भीम रूप धरि असुर सँहारे।", "रामचंद्र के काज सँवारे॥"],
        bhavarth: "आपने विशाल और भयंकर भीम रूप धारण करके असुरों का संहार किया और इस प्रकार श्री रामचंद्र जी के सभी कार्यों को संवारा।",
        start: 50, end: 54
      },
      {
        num: 11,
        lines: ["लाय सजीवन लखन जियाये।", "श्रीरघुबीर हरषि उर लाये॥"],
        bhavarth: "आपने संजीवनी बूटी लाकर लक्ष्मण जी के प्राणों की रक्षा की, जिससे प्रसन्न होकर भगवान श्री राम ने आपको प्रेमपूर्वक हृदय से लगा लिया।",
        start: 54, end: 58
      },
      {
        num: 12,
        lines: ["रघुपति कीन्ही बहुत बड़ाई।", "तुम मम प्रिय भरतहि सम भाई॥"],
        bhavarth: "श्री राम जी ने आपकी अपार प्रशंसा करते हुए कहा कि 'हे हनुमान! तुम मुझे भरत के समान ही प्रिय भ्राता हो।'",
        start: 58, end: 62
      },
      {
        num: 13,
        lines: ["सहस बदन तुम्हरो जस गावैं।", "अस कहि श्रीपति कंठ लगावैं॥"],
        bhavarth: "'सहस्र फणों वाले शेषनाग भी तुम्हारा यशोगान करते हैं'—ऐसा कहकर लक्ष्मीपति भगवान श्री राम ने आपको पुनः कंठ से लगाया।",
        start: 62, end: 66
      },
      {
        num: 14,
        lines: ["सनकादिक ब्रह्मादि मुनीसा।", "नारद सारद सहित अहीसा॥"],
        bhavarth: "सनक, सनन्दन आदि ऋषिगण, ब्रह्मा जी सहित समस्त मुनीश्वर, नारद मुनि, माता सरस्वती और शेषनाग सभी आपका गुणगान करते हैं।",
        start: 66, end: 70
      },
      {
        num: 15,
        lines: ["जम कुबेर दिगपाल जहाँ ते।", "कबि कोबिद कहि सके कहाँ ते॥"],
        bhavarth: "यमराज, कुबेर और दसों दिशाओं के रक्षक (दिग्पाल) भी आपकी महिमा का वर्णन करने में असमर्थ हैं, तो फिर कोई सामान्य कवि या विद्वान कहाँ तक कह सकता है!",
        start: 70, end: 74
      },
      {
        num: 16,
        lines: ["तुम उपकार सुग्रीवहिं कीन्हा।", "राम मिलाय राज पद दीन्हा॥"],
        bhavarth: "आपने सुग्रीव पर महान उपकार किया; उन्हें श्री राम से मिलाया और फिर उन्हें किष्किंधा का राज्य पद दिलाया।",
        start: 74, end: 78
      },
      {
        num: 17,
        lines: ["तुम्हरो मंत्र बिभीषन माना।", "लंकेस्वर भए सब जग जाना॥"],
        bhavarth: "आपके परामर्श और मंत्र को विभीषण ने स्वीकार किया, जिसके फलस्वरूप वे लंका के राजा बने, यह सारा संसार जानता है।",
        start: 78, end: 82
      },
      {
        num: 18,
        lines: ["जुग सहस्र जोजन पर भानू।", "लील्यो ताहि मधुर फल जानू॥"],
        bhavarth: "जो सूर्य सहस्रों योजन की दूरी पर स्थित हैं, उन्हें आपने बाल्यकाल में एक मीठा फल समझकर अनायास ही निगल लिया था।",
        start: 82, end: 86
      },
      {
        num: 19,
        lines: ["प्रभु मुद्रिका मेलि मुख माहीं।", "जलधि लाँघि गये अचरज नाहीं॥"],
        bhavarth: "प्रभु श्री राम की दी हुई मुद्रिका (अंगूठी) को मुख में रखकर आपने विशाल समुद्र को लांघ लिया, इसमें कोई आश्चर्य नहीं है।",
        start: 86, end: 90
      },
      {
        num: 20,
        lines: ["दुर्गम काज जगत के जेते।", "सुगम अनुग्रह तुम्हरे तेते॥"],
        bhavarth: "संसार में जितने भी कठिन से कठिन कार्य हैं, वे आपकी असीम कृपा से अत्यंत सुगम और सहज हो जाते हैं।",
        start: 90, end: 94
      },
      {
        num: 21,
        lines: ["राम दुआरे तुम रखवारे।", "होत न आज्ञा बिनु पैसारे॥"],
        bhavarth: "आप श्री राम के राजद्वार के रक्षक और द्वारपाल हैं। आपकी आज्ञा और कृपा के बिना कोई उस दिव्य धाम में प्रवेश नहीं पा सकता।",
        start: 94, end: 98
      },
      {
        num: 22,
        lines: ["सब सुख लहै तुम्हारी सरना।", "तुम रच्छक काहू को डर ना॥"],
        bhavarth: "आपकी शरण में आने वाले को संसार के सभी सुख प्राप्त होते हैं। जिसके रक्षक आप स्वयं हों, उसे किसी का कोई भय नहीं रह जाता।",
        start: 98, end: 102
      },
      {
        num: 23,
        lines: ["आपन तेज सम्हारो आपै।", "तीनों लोक हाँक तें काँपै॥"],
        bhavarth: "आपके अपार तेज और वेग को केवल आप ही संभाल सकते हैं। आपके एक ही हुंकार से तीनों लोकों में भय का कंपन होने लगता है।",
        start: 102, end: 106
      },
      {
        num: 24,
        lines: ["भूत पिसाच निकट नहिं आवै।", "महाबीर जब नाम सुनावै॥"],
        bhavarth: "जहाँ भी महावीर श्री हनुमान जी का नाम उच्चारित होता है, वहाँ भूत-पिशाच और कोई भी नकारात्मक शक्ति समीप नहीं आ सकती।",
        start: 106, end: 110
      },
      {
        num: 25,
        lines: ["नासै रोग हरै सब पीरा।", "जपत निरंतर हनुमत बीरा॥"],
        bhavarth: "वीर हनुमान जी के पावन नाम का निरंतर जप करने से समस्त असाध्य रोग नष्ट हो जाते हैं और सभी पीड़ाएं दूर हो जाती हैं।",
        start: 110, end: 114
      },
      {
        num: 26,
        lines: ["संकट तें हनुमान छुड़ावै।", "मन क्रम बचन ध्यान जो लावै॥"],
        bhavarth: "जो भी भक्त मन, कर्म और वाणी से हनुमान जी का ध्यान करता है, हनुमान जी उसे जीवन के प्रत्येक संकट से मुक्त कर देते हैं।",
        start: 114, end: 118
      },
      {
        num: 27,
        lines: ["सब पर राम तपस्वी राजा।", "तिन के काज सकल तुम साजा॥"],
        bhavarth: "तपस्वी राजा श्री रामचंद्र जी सर्वश्रेष्ठ हैं; उनके भी समस्त कठिन कार्यों को आपने सहज ही सिद्ध कर दिया।",
        start: 118, end: 122
      },
      {
        num: 28,
        lines: ["और मनोरथ जो कोई लावै।", "सोई अमित जीवन फल पावै॥"],
        bhavarth: "आपकी शरण में जो कोई भी अपनी मनोकामना लेकर आता है, वह अपने जीवन में अनंत और अविनाशी फल प्राप्त करता है।",
        start: 122, end: 126
      },
      {
        num: 29,
        lines: ["चारों जुग परताप तुम्हारा।", "है परसिद्ध जगत उजियारा॥"],
        bhavarth: "सत्ययुग, त्रेता, द्वापर और कलियुग—चारों युगों में आपका प्रताप देदीप्यमान है और आपकी कीर्ति संपूर्ण विश्व को आलोकित करती है।",
        start: 126, end: 130
      },
      {
        num: 30,
        lines: ["साधु संत के तुम रखवारे।", "असुर निकंदन राम दुलारे॥"],
        bhavarth: "आप साधु-संतों और सज्जनों की रक्षा करने वाले, दुष्ट असुरों का नाश करने वाले तथा श्री राम के परम दुलारे हैं।",
        start: 130, end: 134
      },
      {
        num: 31,
        lines: ["अष्ट सिद्धि नौ निधि के दाता।", "अस बर दीन जानकी माता॥"],
        bhavarth: "आप आठों सिद्धियों और नौ निधियों के दाता हैं। यह महान वरदान आपको पूज्या माता जानकी (सीता जी) ने दिया है।",
        start: 134, end: 138
      },
      {
        num: 32,
        lines: ["राम रसायन तुम्हरे पासा।", "सदा रहो रघुपति के दासा॥"],
        bhavarth: "आपके पास 'राम नाम' रूपी अमोघ अमृत रसायन है। आप निरंतर भगवान श्री रघुनाथ जी के परम सेवक बने रहते हैं।",
        start: 138, end: 142
      },
      {
        num: 33,
        lines: ["तुम्हरे भजन राम को पावै।", "जनम जनम के दुख बिसरावै॥"],
        bhavarth: "आपका भजन करने से भगवान श्री राम की प्राप्ति होती है और जन्म-जन्मांतरों के समस्त संताप और दुख मिट जाते हैं।",
        start: 142, end: 146
      },
      {
        num: 34,
        lines: ["अंत काल रघुबर पुर जाई।", "जहाँ जन्म हरि-भक्त कहाई॥"],
        bhavarth: "आपकी कृपा से देहावसान के बाद भक्त श्री राम के परम धाम (साकेत लोक) जाता है और यदि पुनः जन्म ले, तो प्रभु का अनन्य भक्त कहलाता है।",
        start: 146, end: 150
      },
      {
        num: 35,
        lines: ["और देवता चित्त न धरई।", "हनुमत सेइ सर्ब सुख करई॥"],
        bhavarth: "चाहे अन्य किसी देवता का ध्यान न भी किया जाए, केवल हनुमान जी की अनन्य सेवा करने से ही समस्त सुखों की प्राप्ति हो जाती है।",
        start: 150, end: 154
      },
      {
        num: 36,
        lines: ["संकट कटै मिटै सब पीरा।", "जो सुमिरै हनुमत बलबीरा॥"],
        bhavarth: "जो भी महाबली वीर हनुमान जी का स्मरण करता है, उसके समस्त संकट कट जाते हैं और सारी पीड़ाएं नष्ट हो जाती हैं।",
        start: 154, end: 158
      },
      {
        num: 37,
        lines: ["जै जै जै हनुमान गोसाईं।", "कृपा करहु गुरुदेव की नाईं॥"],
        bhavarth: "हे स्वामी हनुमान जी महाराज! आपकी जय हो, जय हो, जय हो! आप सद्गुरु के समान मुझ पर अपनी असीम अनुकंपा कीजिए।",
        start: 158, end: 162
      },
      {
        num: 38,
        lines: ["जो सत बार पाठ कर कोई।", "छूटहि बंदि महा सुख होई॥"],
        bhavarth: "जो कोई भी इस हनुमान चालीसा का सौ बार (नियमित) पाठ करता है, वह भव-बंधन से मुक्त हो जाता है और परमानंद को प्राप्त करता है।",
        start: 162, end: 166
      },
      {
        num: 39,
        lines: ["जो यह पढ़ै हनुमान चलीसा।", "होय सिद्धि साखी गौरीसा॥"],
        bhavarth: "जो इस हनुमान चालीसा का नित्य श्रद्धापूर्वक पाठ करता है, उसके समस्त मनोरथ सिद्ध होते हैं—इसके साक्षी स्वयं भगवान शिव (गौरीश) हैं।",
        start: 166, end: 170
      },
      {
        num: 40,
        lines: ["तुलसीदास सदा हरि चेरा।", "कीजै नाथ हृदय मँह डेरा॥"],
        bhavarth: "तुलसीदास जी कहते हैं कि वे सदैव श्री हरि के सेवक हैं। हे नाथ! आप माता सीता और श्री राम सहित मेरे हृदय में सदा वास कीजिए।",
        start: 170, end: 174
      }
    ],
    closingDoha: {
      id: "doha-3",
      label: "समापन दोहा",
      lines: [
        "पवनतनय संकट हरन, मंगल मूरति रूप।",
        "राम लखन सीता सहित, हृदय बसहु सुर भूप॥"
      ],
      bhavarth: "हे पवनपुत्र! आप समस्त संकटों को हरने वाले और साक्षात् मंगल की मूर्ति हैं। हे देवों के भी स्वामी! आप प्रभु श्री राम, लक्ष्मण और माता सीता के साथ सदैव मेरे हृदय में निवास कीजिए।",
      start: 174,
      end: 180
    }
  };

  const BAJRANG_BAAN_DATA = {
    title: "श्री बजरंग बाण",
    subtitle: "अथ श्री बजरंग बाण (परम शक्तिशाली संकट निवारक पाठ)",
    dohaIntro: {
      label: "प्रारंभिक दोहा",
      lines: [
        "निश्चय प्रेम प्रतीति ते, बिनय करैं सनमान।",
        "तेहि के कारज सकल शुभ, सिद्ध करैं हनुमान॥"
      ],
      bhavarth: "जो भी भक्त पूर्ण प्रेम, विश्वास और सम्मान के साथ श्री हनुमान जी से प्रार्थना करता है, हनुमान जी उसके सभी शुभ कार्यों को सिद्ध कर देते हैं।"
    },
    verses: [
      {
        num: 1,
        lines: ["जय हनुमंत संत हितकारी।", "सुनि लीजै प्रभु अरज हमारी॥"],
        bhavarth: "हे संतजनों का हित करने वाले दयालु हनुमान जी! आपकी जय हो। हे प्रभु, हमारी इस दीन प्रार्थना को सुन लीजिए।"
      },
      {
        num: 2,
        lines: ["जन के काज बिलंब न कीजै।", "आतुर दौरि महा सुख दीजै॥"],
        bhavarth: "अपने सेवक के कार्य को सिद्ध करने में तनिक भी विलंब न कीजिए। शीघ्र दौड़कर आइए और हमें परम सुख प्रदान कीजिए।"
      },
      {
        num: 3,
        lines: ["जैसे कूदि सिंधु महिपारा।", "सुरसा बदन पैठि बिस्तारा॥"],
        bhavarth: "जैसे आपने एक ही छलांग में विशाल समुद्र पार किया था और सुरसा के मुख में प्रवेश कर अपनी बुद्धि और बल का परिचय दिया था।"
      },
      {
        num: 4,
        lines: ["आगे जाय लंकिनी रोका।", "मारेहु लात गई सुर लोका॥"],
        bhavarth: "आगे बढ़ने पर जब लंकिनी ने आपको रोका, तो आपने एक ही प्रहार से उसका उद्धार कर दिया।"
      },
      {
        num: 5,
        lines: ["जाय बिभीषन को सुख दीन्हा।", "सीता निरखि परमपद लीन्हा॥"],
        bhavarth: "आपने भक्त विभीषण से मिलकर उन्हें संबल दिया और माता सीता के दर्शन कर जीवन का सर्वोच्च पद प्राप्त किया।"
      },
      {
        num: 6,
        lines: ["बाग उजारि अछय को मारा।", "लाँघि कनक को कोट पहारा॥"],
        bhavarth: "आपने अशोक वाटिका को उजाड़कर अक्षय कुमार का संहार किया और स्वर्णमयी लंका के विशाल परकोटे को लांघ दिया।"
      },
      {
        num: 7,
        lines: ["लंक जराय सुरपुर पहुँचाया।", "राम चरन पर सीस नवाया॥"],
        bhavarth: "लंका को भस्म करके आप पुनः प्रभु के समीप आए और भगवान श्री राम के पावन चरणों में मस्तक झुकाया।"
      },
      {
        num: 8,
        lines: ["कपिपति कीन्हि बहुत बड़ाई।", "कहा कि तुम मम प्रिय भाई॥"],
        bhavarth: "वानरराज सुग्रीव और प्रभु श्री राम ने आपकी अपार प्रशंसा की और आपको भ्राता के समान प्रिय बताया।"
      },
      {
        num: 9,
        lines: ["उठु-उठु चलु तोहि राम दोहाई।", "पायँ परौं कर जोरि मनाई॥"],
        bhavarth: "हे हनुमान जी! उठिए और हमारी रक्षा के लिए चलिए, आपको प्रभु श्री राम की शपथ है! मैं हाथ जोड़कर आपके चरणों में शीश नवाता हूँ।"
      },
      {
        num: 10,
        lines: ["ॐ हं हं हं हनुमंत कपीसा।", "ॐ हुं हुं हुं हनु अरि उर सीसा॥"],
        bhavarth: "हे कपीश! 'हं हं हं' बीजमंत्र स्वरूप आप शत्रुओं के हृदय और मस्तक का दलन कीजिए।"
      },
      {
        num: 11,
        lines: ["सत्य होहु हरि सपथ पायके।", "राम दूत धरु मारु धायके॥"],
        bhavarth: "भगवान श्री हरि की शपथ लेकर आप हमारे संकटों का नाश कीजिए। हे रामदूत! तुरंत दौड़कर दुष्टों का दमन कीजिए।"
      },
      {
        num: 12,
        lines: ["जय जय जय हनुमंत अगाधा।", "दुख पावत जन केहि अपराधा॥"],
        bhavarth: "हे अगाध महिमा वाले हनुमान जी! आपकी जय हो। आपके रहते हुए आपका यह दास किस अपराध से दुख पा रहा है?"
      },
      {
        num: 13,
        lines: ["पूजा जप तप नेम अचारा।", "नहिं जानत कछु दास तुम्हारा॥"],
        bhavarth: "आपका यह दास पूजा, जप, तप, नियम और आचार के विषय में कुछ नहीं जानता; वह केवल आपके आश्रित है।"
      },
      {
        num: 14,
        lines: ["बन उपबन मग गिरि गृह माहीं।", "तुम्हरे बल हम डरपत नाहीं॥"],
        bhavarth: "वन, उपवन, मार्ग, पर्वत अथवा घर में—आपके असीम बल के सहारे हम किसी से भी भयभीत नहीं होते।"
      },
      {
        num: 15,
        lines: ["जनकसुता हरि दास कहावो।", "ताकी सपथ बिलंब न लावो॥"],
        bhavarth: "आप जनकनंदिनी सीता जी और प्रभु श्री राम के सेवक कहलाते हैं; अतः उनकी सौगंध, अब तनिक भी देरी न कीजिए।"
      },
      {
        num: 16,
        lines: ["जै जै जै धुनि होत अकासा।", "सुमिरत होत दुसह दुख नासा॥"],
        bhavarth: "आकाश में आपकी जय-जयकार की ध्वनि गूंज रही है; आपका स्मरण करते ही असह्य दुखों का भी नाश हो जाता है।"
      },
      {
        num: 17,
        lines: ["चरन पकरि कर जोरि मनावौं।", "यहि औसर अब केहि गोहरावौं॥"],
        bhavarth: "मैं आपके चरण पकड़कर हाथ जोड़कर प्रार्थना करता हूँ; इस कठिन समय में आपके अतिरिक्त मैं और किसे पुकारूं!"
      },
      {
        num: 18,
        lines: ["उठु उठु चलु तोहि राम दोहाई।", "परौं पानि करि बिनय सुनाई॥"],
        bhavarth: "हे पवनसुत! आपको श्री राम की दुहाई है, उठकर कृपा कीजिए; मैं आपके चरणों में गिरकर विनती करता हूँ।"
      },
      {
        num: 19,
        lines: ["एहि प्रकार जो पाठ सुनावै।", "सो नर सकल सुखनि को पावै॥"],
        bhavarth: "जो भी मनुष्य इस प्रकार नित्य बजरंग बाण का पाठ करता है, वह संसार के समस्त सुखों को प्राप्त करता है।"
      }
    ],
    dohaOutro: {
      label: "समापन दोहा",
      lines: [
        "उर प्रतीति दृढ़ सरन ह्वै, पाठ करै धरि ध्यान।",
        "बाधा सब बैकुंठ लहि, सुनि संजीवन बान॥"
      ],
      bhavarth: "हृदय में अटूट विश्वास और हनुमान जी की अनन्य शरण लेकर जो भी ध्यानपूर्वक पाठ करता है, उसकी समस्त बाधाएं कट जाती हैं।"
    }
  };

  const ASHTAK_DATA = {
    title: "संकट मोचन हनुमानाष्टक",
    subtitle: "श्री संकटमोचन हनुमानाष्टक (आठों छंद व संकट निवारण)",
    verses: [
      {
        num: 1,
        lines: [
          "बाल समय रबि भक्षि लियो तब, तीनहुं लोक भयो अँधियारो।",
          "ताहि सों त्रास भयो जग को, यह संकट काहु सों जात न टारो॥",
          "देवन आनि करी बिनती तब, छाँड़ि दियो रबि कष्ट निवारो।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "बाल्यकाल में जब आपने सूर्य को फल समझकर मुख में रख लिया, तब तीनों लोकों में अंधकार छा गया। समस्त देवताओं ने जब आपसे प्रार्थना की, तब आपने सूर्यदेव को मुक्त कर सबका कष्ट दूर किया। हे कपिश्रेष्ठ! इस संसार में कौन नहीं जानता कि आपका नाम 'संकटमोचन' है।"
      },
      {
        num: 2,
        lines: [
          "बालि की त्रास कपीस बसै गिरि, जात महाप्रभु पंथ निहारो।",
          "चौंकि महामुनि साप दियो तब, चाहि दई नहिं कौतुकि भारो॥",
          "कैकयि सुत सों मिलि मित्रता कियो, बालि बध्यो नृप राज उबारो।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "बाली के भय से जब सुग्रीव ऋष्यमूक पर्वत पर रहते थे, तब आपने ही प्रभु श्री राम से उनकी भेंट और मित्रता कराई, बाली का उद्धार करवाकर सुग्रीव को राज्य दिलाया। हे संकटमोचन! आपकी महिमा अपरंपार है।"
      },
      {
        num: 3,
        lines: [
          "अंगद सों संग लै कपि दल, दच्छिन दिशि को खोजि सँवारो।",
          "जीवन दायक सजीवन लाय के, लछिमन को जिय दान पबारो॥",
          "रावण सैन्य महाबल संहारि, लंक जराई असुर संघारो।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "आपने वानर सेना के साथ दक्षिण दिशा में माता सीता की खोज की, संजीवनी लाकर लक्ष्मण जी को जीवनदान दिया और लंका दहन कर रावण की सेना का संहार किया। हे हनुमान जी, आप ही संकटमोचन हैं।"
      },
      {
        num: 4,
        lines: [
          "रावण जुद्ध अजान कियो तब, नाग कि फांस सबै दल बाँध्यो।",
          "श्रीरघुनाथ समेत सबै दल, सोचत भे सब संकट सांध्यो॥",
          "आन खगेस तबै हनुमान, छुड़ाय फंद संकट सब काट्यो।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "जब मेघनाद के नागपाश में प्रभु श्री राम और लक्ष्मण जी सहित समस्त दल बंध गया था, तब आपने गरुड़ जी को बुलाकर उस भीषण नागपाश को कटवाया और संकट का निवारण किया।"
      },
      {
        num: 5,
        lines: [
          "दुर्बसा मुनि साप दियो सुर, इंद्रहिं संकट भारी परायो।",
          "आन उबारि लियो सब देवनि, अमृत कलश सुरन पहुँचाया॥",
          "तेहि सम और कछु नहिं संकट, काहु सों मेटि सक्यो नहिं जावै।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "जब दुर्वासा मुनि के शाप से देवराज इंद्र और देवता संकट में पड़े, तब आपने उन सबका उद्धार किया। आपके समान संकट निवारक संसार में कोई अन्य नहीं है।"
      },
      {
        num: 6,
        lines: [
          "प्रभु के काज सँवारन हित, बार-बार अवतार लियो है।",
          "संतन के हितकारी सदा, दुखियन के दुख दूर कियो है॥",
          "दीनदयाल दयालु कृपालु, सबन के संकट आनि हरयो है।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "प्रभु श्री राम के कार्यों को सिद्ध करने और संतों के कल्याण हेतु आपने सदैव अवतार लेकर दीनों के समस्त कष्टों को हरा है।"
      },
      {
        num: 7,
        lines: [
          "पांडव दल के संग रहे रथि, मारुत नंदन पार्थ उबारे।",
          "कुरुक्षेत्र जुद्ध महा भयंकर, विजय कराई सखा सँवारे॥",
          "दुर्योधन के मान मर्दन करि, धर्म की जय कराई सारे।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "महाभारत के भीषण युद्ध में आप अर्जुन के रथ की ध्वजा पर विराजमान रहे और हर क्षण उनकी रक्षा कर धर्म की विजय कराई।"
      },
      {
        num: 8,
        lines: [
          "राम के काज संवारे महाप्रभु, भक्तन के मन आनंद भायो।",
          "तुलसीदास प्रभु आस तिहारी, संकट हरहु जो तुम पे आयो॥",
          "काटि दियो सब त्रास हमारे, जय हनुमान महा बल पायो।",
          "को नहिं जानत है जग में कपि, संकटमोचन नाम तिहारो॥"
        ],
        bhavarth: "हे महाप्रभु! आपने सदा प्रभु के काज संवारे हैं। अब हम पर कृपा कर हमारे समस्त सांसारिक संतापों को हर लीजिए। हे कपीश! आप ही संकटमोचन हैं।"
      }
    ],
    dohaOutro: {
      label: "दोहा",
      lines: [
        "लाल देह लाली लसे, अरु धरि लाल लँगूर।",
        "बज्र देह दानव दलन, जय जय जय कपि सूर॥"
      ],
      bhavarth: "जिनका सिंदूरी लाल शरीर है, जो लाल लंगोट धारण करते हैं, जिनका शरीर वज्र के समान सुदृढ़ है और जो दानवों का दलन करने वाले हैं—उन सूर्य के समान तेजस्वी वीर हनुमान जी की जय हो, जय हो, जय हो!"
    }
  };

  const AARTI_DATA = {
    title: "श्री हनुमान जी की आरती",
    subtitle: "आरती कीजै हनुमान लला की (परम पावन दीप आरती)",
    lines: [
      "आरती कीजै हनुमान लला की। दुष्ट दलन रघुनाथ कला की॥",
      "जाके बल से गिरिवर काँपै। रोग दोष जाके निकट न झाँपै॥",
      "अंजनि पुत्र महा बलदाई। संतन के प्रभु सदा सहाई॥",
      "दे बीड़ा रघुनाथ पठाए। लंका जारि सीय सुधि लाये॥",
      "लंका सो कोट समुद्र सी खाई। जात पवनसुत बार न लाई॥",
      "लंका जारि असुर संहारे। सियारामजी के काज संवारे॥",
      "लक्ष्मण मूर्छित पड़े सकारे। आणि संजीवन प्रान उबारे॥",
      "पैठि पताल तोरि जम-कारे। अहिरावण की भुजा उखारे॥",
      "बायें भुजा असुर दल मारे। दहिने भुजा संत जन तारे॥",
      "सुर नर मुनि जन आरती उतारें। जै जै जै हनुमान उचारें॥",
      "कंचन थार कपूर लौ छाई। आरती करत अंजना माई॥",
      "जो हनुमानजी की आरती गावै। बसि बैकुंठ परम पद पावै॥"
    ],
    bhavarth: "भगवान श्री राम के अनन्य सेवक, दुष्टों का नाश करने वाले, अंजना नंदन श्री हनुमान जी की आरती प्रेमपूर्वक कीजिए। जो भी यह आरती गाता है, वह जीवन में सभी सुख पाकर वैकुंठ पद प्राप्त करता है।"
  };

  const NAMAVALI_108 = [
    "ॐ आञ्जनेयाय नमः", "ॐ महावीराय नमः", "ॐ हनूमते नमः", "ॐ मारुतात्मजाय नमः",
    "ॐ तत्त्वज्ञानप्रदाय नमः", "ॐ विदुषे नमः", "ॐ वायुपुत्राय नमः", "ॐ महाद्युतये नमः",
    "ॐ रामदूताय नमः", "ॐ रुद्रवीर्याय नमः", "ॐ केसरीनन्दनाय नमः", "ॐ लोकपूजिताय नमः",
    "ॐ वज्रकायाय नमः", "ॐ पिङ्गाक्षाय नमः", "ॐ लङ्कादहनाय नमः", "ॐ कपिराजाय नमः",
    "ॐ महाबलाय नमः", "ॐ द्रोणाचलधराय नमः", "ॐ सञ्जीवननगहर्त्रे नमः", "ॐ लक्ष्मणप्राणदात्रे नमः",
    "ॐ विभीषणहितैषिणे नमः", "ॐ सीताशोकविनाशकाय नमः", "ॐ अक्षघ्नाय नमः", "ॐ दशग्रीवगर्वहर्त्रे नमः",
    "ॐ सुग्रीवराज्यदात्रे नमः", "ॐ जितेन्द्रियाय नमः", "ॐ ज्ञानिनां वरदाय नमः", "ॐ गदाधराय नमः",
    "ॐ वज्रदंष्ट्राय नमः", "ॐ प्रसन्नात्मने नमः", "ॐ शान्ताय नमः", "ॐ सर्वशत्रुघ्नाय नमः",
    "ॐ ब्रह्मचारिणे नमः", "ॐ चिरञ्जीविने नमः", "ॐ सर्वसिद्धिप्रदाय नमः", "ॐ चतुर्भुजाय नमः",
    "ॐ वानरयूथपाय नमः", "ॐ तेजस्विने नमः", "ॐ भयहर्त्रे नमः", "ॐ दीनबन्धवे नमः",
    "ॐ राघवप्रियाय नमः", "ॐ भक्तवत्सलाय नमः", "ॐ मनोवेगाय नमः", "ॐ मारुततुल्यवेगाय नमः",
    "ॐ सूर्यशिष्याय नमः", "ॐ वेदपारगाय नमः", "ॐ कम्बुकण्ठाय नमः", "ॐ कपिश्रेष्ठाय नमः",
    "ॐ कालनेमिप्रमथनाय नमः", "ॐ अहिरावणसंहर्त्रे नमः", "ॐ पातालविजयिने नमः", "ॐ भक्तपालकाय नमः",
    "ॐ सुरारिदर्पघ्नाय नमः", "ॐ नवव्याकरणवेत्रे नमः", "ॐ त्रैलोक्यरक्षकाय नमः", "ॐ उग्राय नमः",
    "ॐ शुभाय नमः", "ॐ पावकाय नमः", "ॐ सर्वग्रहविनाशकाय नमः", "ॐ परविद्यानिवारकाय नमः",
    "ॐ सर्वदुःखहराय नमः", "ॐ सर्वरोगहराय नमः", "ॐ सर्वकष्टहराय नमः", "ॐ सर्वसम्पत्प्रदाय नमः",
    "ॐ दीर्घायुषे नमः", "ॐ यशस्विने नमः", "ॐ कान्तिमते नमः", "ॐ कीर्तिवर्धनाय नमः",
    "ॐ श्रीप्रदाय नमः", "ॐ पुण्यश्लोकाय नमः", "ॐ धर्मात्मने नमः", "ॐ धर्मधुन्धराय नमः",
    "ॐ सत्यसन्धाय नमः", "ॐ सत्यवचने नमः", "ॐ सत्यवादिने नमः", "ॐ अनघाय नमः",
    "ॐ निष्कलङ्काय नमः", "ॐ शुचये नमः", "ॐ निर्मलाय नमः", "ॐ पुण्यकारिणे नमः",
    "ॐ साधुरक्षकाय नमः", "ॐ सर्वकल्याणकारकाय नमः", "ॐ मङ्गलमूर्तये नमः", "ॐ सर्वविघ्नविनाशकाय नमः",
    "ॐ कामरूपिणे नमः", "ॐ महाकायाय नमः", "ॐ प्रभाकराय नमः", "ॐ जगद्वन्द्याय नमः",
    "ॐ जगत्त्रात्रे नमः", "ॐ जनप्रियाय नमः", "ॐ वरप्रदाय नमः", "ॐ वाग्मिने नमः",
    "ॐ नीतिज्ञाय नमः", "ॐ ज्ञानसागराय नमः", "ॐ शरण्यपालकाय नमः", "ॐ अभयप्रदाय नमः",
    "ॐ पञ्चवक्त्राय नमः", "ॐ एकादशरुद्रात्मकाय नमः", "ॐ सर्वतन्त्रस्वरूपिणे नमः", "ॐ सर्वमन्त्रात्मकाय नमः",
    "ॐ सर्वयन्त्रात्मकाय नमः", "ॐ सर्वलोकेशाय नमः", "ॐ सर्वेशाय नमः", "ॐ सर्ववेदिने नमः",
    "ॐ सीतासमेतश्रीरामपादसेवापरायणाय नमः", "ॐ श्रीसीतारामभक्तशिरोमणये नमः", "ॐ संकटमोचनाय नमः", "ॐ श्रीहनुमते नमः"
  ];

  /* ==========================================================================
     2. APP STATE MANAGEMENT
     ========================================================================== */

  const state = {
    activeTab: 'chalisa',
    viewMode: 'all', // 'all', 'text-only', 'audio-only'
    theme: localStorage.getItem('agy_hanuman_theme') || 'light',
    fontScale: parseFloat(localStorage.getItem('agy_hanuman_font_scale')) || 1.0,
    showAllBhavarth: false,
    bookmarks: JSON.parse(localStorage.getItem('agy_hanuman_bookmarks') || '[]'),
    jaapCount: parseInt(localStorage.getItem('agy_hanuman_jaap_count') || '0', 10),
    malaCount: parseInt(localStorage.getItem('agy_hanuman_mala_count') || '0', 10),
    autoScroll: true,
    isPlaying: false,
    isMuted: false,
    speed: 1.0,
    isLooping: false,
    currentChaupaiNum: null,
    audioContext: null
  };

  /* ==========================================================================
     3. DOM ELEMENTS
     ========================================================================== */

  const dom = {
    body: document.body,
    progressBar: document.getElementById('readingProgressBar'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    bookmarksBtn: document.getElementById('bookmarksBtn'),
    fontDecBtn: document.getElementById('fontDecBtn'),
    fontIncBtn: document.getElementById('fontIncBtn'),
    fontResetBtn: document.getElementById('fontResetBtn'),
    bhavarthToggleAllBtn: document.getElementById('bhavarthToggleAllBtn'),
    tabButtons: document.querySelectorAll('.tab-btn'),
    sections: {
      chalisa: document.getElementById('section-chalisa'),
      bajrangBaan: document.getElementById('section-bajrang-baan'),
      ashtak: document.getElementById('section-ashtak'),
      aarti: document.getElementById('section-aarti'),
      namavali: document.getElementById('section-namavali'),
      jaap: document.getElementById('section-jaap')
    },
    viewModeButtons: document.querySelectorAll('.view-btn'),
    // Audio Player Elements
    audioElement: document.getElementById('mainAudioPlayer'),
    audioTrackName: document.getElementById('audioTrackName'),
    audioSourceChip: document.getElementById('audioSourceChip'),
    audioSpectrum: document.getElementById('audioSpectrum'),
    btnPlayMaster: document.getElementById('btnPlayMaster'),
    seekSlider: document.getElementById('seekSlider'),
    currentTimeLabel: document.getElementById('currentTimeLabel'),
    totalDurationLabel: document.getElementById('totalDurationLabel'),
    btnSpeed: document.getElementById('btnSpeed'),
    btnRepeat: document.getElementById('btnRepeat'),
    btnAutoScroll: document.getElementById('btnAutoScroll'),
    btnChooseAudio: document.getElementById('btnChooseAudio'),
    customAudioInput: document.getElementById('customAudioInput'),
    btnMute: document.getElementById('btnMute'),
    volumeSlider: document.getElementById('volumeSlider'),
    playerDock: document.getElementById('audioPlayerDock'),
    dockCollapseBar: document.getElementById('dockCollapseBar'),
    // Jaap Elements
    jaapCounterDisplay: document.getElementById('jaapCounterDisplay'),
    jaapBigNumber: document.getElementById('jaapBigNumber'),
    jaapStatMala: document.getElementById('jaapStatMala'),
    jaapStatLifetime: document.getElementById('jaapStatLifetime'),
    jaapResetBtn: document.getElementById('jaapResetBtn'),
    // Modals & Toasts
    modalOverlay: document.getElementById('modalOverlay'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    toastMsg: document.getElementById('toastMsg')
  };

  /* ==========================================================================
     4. TEMPLE BELL CHIME (SYNTHESIZED NATIVE WEB AUDIO API)
     ========================================================================== */

  function playTempleBellChime(freq = 587.33, duration = 1.2) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!state.audioContext) {
        state.audioContext = new AudioCtx();
      }
      if (state.audioContext.state === 'suspended') {
        state.audioContext.resume();
      }

      const now = state.audioContext.currentTime;
      const osc1 = state.audioContext.createOscillator();
      const osc2 = state.audioContext.createOscillator();
      const gain = state.audioContext.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now); // D5 fundamental
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2.76, now); // Bell harmonic overtone

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(state.audioContext.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn('Web Audio Bell Chime error:', e);
    }
  }

  /* ==========================================================================
     5. RENDER STOTRAS (पवित्र पाठों का सुंदर और अर्थपूर्ण निर्माण)
     ========================================================================== */

  function renderChalisa() {
    const container = dom.sections.chalisa;
    if (!container) return;

    let html = `
      <div class="stotra-heading-card">
        <h2 class="stotra-title">श्री हनुमान चालीसा</h2>
        <p class="stotra-subtitle">गोस्वामी तुलसीदास कृत • संपूर्ण दोहे, ४० चौपाइयाँ एवं समापन दोहा</p>
      </div>
    `;

    // 1. Opening Dohas
    CHALISA_DATA.openingDohas.forEach((doha) => {
      const isBookmarked = state.bookmarks.includes(doha.id);
      html += `
        <article class="verse-card doha-card" id="${doha.id}" data-type="doha">
          <div class="verse-meta">
            <span class="verse-badge">${doha.label}</span>
            <div class="verse-actions">
              <button class="verse-action-btn" title="यहाँ से ऑडियो बजाएं (Play/Sync here)" onclick="window.hanumanApp.seekTo(${doha.start}, '${doha.label}')">▶</button>
              <button class="verse-action-btn ${isBookmarked ? 'bookmarked' : ''}" title="बुकमार्क करें" onclick="window.hanumanApp.toggleBookmark('${doha.id}', '${doha.label}')">
                ${isBookmarked ? '★' : '☆'}
              </button>
              <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('${doha.id}')">📋</button>
              <button class="verse-action-btn" title="शेयर करें" onclick="window.hanumanApp.shareVerse('${doha.id}')">↗</button>
            </div>
          </div>
          <div class="verse-text doha-text">
            ${doha.lines[0]}<br>${doha.lines[1]}
          </div>
          <button class="chip-btn" style="margin-top:6px; font-size:0.75rem;" onclick="window.hanumanApp.toggleBhavarth('${doha.id}')">
            📖 भावार्थ
          </button>
          <div class="verse-bhavarth ${state.showAllBhavarth ? 'visible' : ''}" id="bhavarth-${doha.id}">
            <span class="bhavarth-label">सरल भावार्थ:</span> ${doha.bhavarth}
          </div>
        </article>
      `;
    });

    // 2. 40 Chaupais
    CHALISA_DATA.chaupais.forEach((chaupai) => {
      const verseId = `chaupai-${chaupai.num}`;
      const isBookmarked = state.bookmarks.includes(verseId);
      html += `
        <article class="verse-card" id="${verseId}" data-num="${chaupai.num}" data-start="${chaupai.start}" data-end="${chaupai.end}">
          <div class="verse-meta">
            <span class="verse-badge">चौपाई ${chaupai.num}</span>
            <div class="verse-actions">
              <button class="verse-action-btn" title="यहाँ से ऑडियो बजाएं (Play/Sync here)" onclick="window.hanumanApp.seekTo(${chaupai.start}, 'चौपाई ${chaupai.num}')">▶</button>
              <button class="verse-action-btn ${isBookmarked ? 'bookmarked' : ''}" title="बुकमार्क करें" onclick="window.hanumanApp.toggleBookmark('${verseId}', 'चौपाई ${chaupai.num}')">
                ${isBookmarked ? '★' : '☆'}
              </button>
              <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('${verseId}')">📋</button>
              <button class="verse-action-btn" title="शेयर करें" onclick="window.hanumanApp.shareVerse('${verseId}')">↗</button>
            </div>
          </div>
          <div class="verse-text">
            ${chaupai.lines[0]}<br>${chaupai.lines[1]}
          </div>
          <button class="chip-btn" style="margin-top:6px; font-size:0.75rem;" onclick="window.hanumanApp.toggleBhavarth('${verseId}')">
            📖 भावार्थ
          </button>
          <div class="verse-bhavarth ${state.showAllBhavarth ? 'visible' : ''}" id="bhavarth-${verseId}">
            <span class="bhavarth-label">सरल भावार्थ:</span> ${chaupai.bhavarth}
          </div>
        </article>
      `;
    });

    // 3. Closing Doha
    const closing = CHALISA_DATA.closingDoha;
    const isClosingBookmarked = state.bookmarks.includes(closing.id);
    html += `
      <article class="verse-card doha-card" id="${closing.id}" data-type="doha">
        <div class="verse-meta">
          <span class="verse-badge">${closing.label}</span>
          <div class="verse-actions">
            <button class="verse-action-btn" title="यहाँ से ऑडियो बजाएं (Play/Sync here)" onclick="window.hanumanApp.seekTo(${closing.start}, '${closing.label}')">▶</button>
            <button class="verse-action-btn ${isClosingBookmarked ? 'bookmarked' : ''}" title="बुकमार्क करें" onclick="window.hanumanApp.toggleBookmark('${closing.id}', '${closing.label}')">
              ${isClosingBookmarked ? '★' : '☆'}
            </button>
            <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('${closing.id}')">📋</button>
            <button class="verse-action-btn" title="शेयर करें" onclick="window.hanumanApp.shareVerse('${closing.id}')">↗</button>
          </div>
        </div>
        <div class="verse-text doha-text">
          ${closing.lines[0]}<br>${closing.lines[1]}
        </div>
        <button class="chip-btn" style="margin-top:6px; font-size:0.75rem;" onclick="window.hanumanApp.toggleBhavarth('${closing.id}')">
          📖 भावार्थ
        </button>
        <div class="verse-bhavarth ${state.showAllBhavarth ? 'visible' : ''}" id="bhavarth-${closing.id}">
          <span class="bhavarth-label">सरल भावार्थ:</span> ${closing.bhavarth}
        </div>
      </article>
    `;

    container.innerHTML = html;
  }

  function renderBajrangBaan() {
    const container = dom.sections.bajrangBaan;
    if (!container) return;

    let html = `
      <div class="stotra-heading-card">
        <h2 class="stotra-title">${BAJRANG_BAAN_DATA.title}</h2>
        <p class="stotra-subtitle">${BAJRANG_BAAN_DATA.subtitle}</p>
      </div>
      <article class="verse-card doha-card" id="bb-intro">
        <div class="verse-meta">
          <span class="verse-badge">${BAJRANG_BAAN_DATA.dohaIntro.label}</span>
          <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('bb-intro')">📋</button>
        </div>
        <div class="verse-text doha-text">
          ${BAJRANG_BAAN_DATA.dohaIntro.lines[0]}<br>${BAJRANG_BAAN_DATA.dohaIntro.lines[1]}
        </div>
        <div class="verse-bhavarth visible" style="margin-top:8px;">
          <span class="bhavarth-label">भावार्थ:</span> ${BAJRANG_BAAN_DATA.dohaIntro.bhavarth}
        </div>
      </article>
    `;

    BAJRANG_BAAN_DATA.verses.forEach((v) => {
      const vId = `bb-verse-${v.num}`;
      html += `
        <article class="verse-card" id="${vId}">
          <div class="verse-meta">
            <span class="verse-badge">पद ${v.num}</span>
            <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('${vId}')">📋</button>
          </div>
          <div class="verse-text">
            ${v.lines[0]}<br>${v.lines[1]}
          </div>
          <div class="verse-bhavarth visible" style="margin-top:8px;">
            <span class="bhavarth-label">भावार्थ:</span> ${v.bhavarth}
          </div>
        </article>
      `;
    });

    html += `
      <article class="verse-card doha-card" id="bb-outro">
        <div class="verse-meta">
          <span class="verse-badge">${BAJRANG_BAAN_DATA.dohaOutro.label}</span>
          <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('bb-outro')">📋</button>
        </div>
        <div class="verse-text doha-text">
          ${BAJRANG_BAAN_DATA.dohaOutro.lines[0]}<br>${BAJRANG_BAAN_DATA.dohaOutro.lines[1]}
        </div>
        <div class="verse-bhavarth visible" style="margin-top:8px;">
          <span class="bhavarth-label">भावार्थ:</span> ${BAJRANG_BAAN_DATA.dohaOutro.bhavarth}
        </div>
      </article>
    `;

    container.innerHTML = html;
  }

  function renderAshtak() {
    const container = dom.sections.ashtak;
    if (!container) return;

    let html = `
      <div class="stotra-heading-card">
        <h2 class="stotra-title">${ASHTAK_DATA.title}</h2>
        <p class="stotra-subtitle">${ASHTAK_DATA.subtitle}</p>
      </div>
    `;

    ASHTAK_DATA.verses.forEach((v) => {
      const vId = `ashtak-chhand-${v.num}`;
      html += `
        <article class="verse-card" id="${vId}">
          <div class="verse-meta">
            <span class="verse-badge">छंद ${v.num}</span>
            <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('${vId}')">📋</button>
          </div>
          <div class="verse-text" style="text-align: left; line-height: 2;">
            ${v.lines.join('<br>')}
          </div>
          <div class="verse-bhavarth visible" style="margin-top:10px;">
            <span class="bhavarth-label">सरल भावार्थ:</span> ${v.bhavarth}
          </div>
        </article>
      `;
    });

    html += `
      <article class="verse-card doha-card" id="ashtak-doha">
        <div class="verse-meta">
          <span class="verse-badge">${ASHTAK_DATA.dohaOutro.label}</span>
          <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('ashtak-doha')">📋</button>
        </div>
        <div class="verse-text doha-text">
          ${ASHTAK_DATA.dohaOutro.lines[0]}<br>${ASHTAK_DATA.dohaOutro.lines[1]}
        </div>
        <div class="verse-bhavarth visible" style="margin-top:8px;">
          <span class="bhavarth-label">भावार्थ:</span> ${ASHTAK_DATA.dohaOutro.bhavarth}
        </div>
      </article>
    `;

    container.innerHTML = html;
  }

  function renderAarti() {
    const container = dom.sections.aarti;
    if (!container) return;

    let html = `
      <div class="stotra-heading-card">
        <h2 class="stotra-title">${AARTI_DATA.title}</h2>
        <p class="stotra-subtitle">${AARTI_DATA.subtitle}</p>
      </div>
      <article class="verse-card" id="aarti-full">
        <div class="verse-meta">
          <span class="verse-badge">दीप आरती</span>
          <button class="verse-action-btn" title="कॉपी करें" onclick="window.hanumanApp.copyVerse('aarti-full')">📋</button>
          <button class="verse-action-btn" title="शेयर करें" onclick="window.hanumanApp.shareVerse('aarti-full')">↗</button>
        </div>
        <div class="verse-text" style="line-height: 2.1;">
          ${AARTI_DATA.lines.join('<br>')}
        </div>
        <div class="verse-bhavarth visible" style="margin-top:14px;">
          <span class="bhavarth-label">महात्म्य:</span> ${AARTI_DATA.bhavarth}
        </div>
      </article>
    `;

    container.innerHTML = html;
  }

  function renderNamavali() {
    const container = dom.sections.namavali;
    if (!container) return;

    let html = `
      <div class="stotra-heading-card">
        <h2 class="stotra-title">श्री हनुमान १०८ नामावली</h2>
        <p class="stotra-subtitle">अष्टोत्तर शतनामावली • प्रत्येक नाम के साथ पवित्र मंत्र जप</p>
      </div>
      <div class="names-grid">
    `;

    NAMAVALI_108.forEach((name, idx) => {
      html += `
        <div class="name-card">
          <span class="name-number">${idx + 1}</span>
          <span class="name-mantra">${name}</span>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  /* ==========================================================================
     6. AUDIO PLAYER ENGINE (HTML5 Native Audio API)
     ========================================================================== */

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function initAudioPlayer() {
    const audio = dom.audioElement;
    if (!audio) return;

    // Default Audio Source: Local high-quality devotional ambient track
    audio.src = 'assets/audio/hanuman-chalisa-ambient.wav';
    audio.load();

    // Play / Pause Master Toggle
    dom.btnPlayMaster.addEventListener('click', togglePlayPause);

    // Audio Playback Events
    audio.addEventListener('play', () => {
      state.isPlaying = true;
      dom.btnPlayMaster.innerHTML = '❚❚';
      dom.btnPlayMaster.title = 'पॉज़ करें (Pause)';
      dom.audioSpectrum.classList.add('playing');
    });

    audio.addEventListener('pause', () => {
      state.isPlaying = false;
      dom.btnPlayMaster.innerHTML = '▶︎';
      dom.btnPlayMaster.title = 'बजाएं (Play)';
      dom.audioSpectrum.classList.remove('playing');
    });

    audio.addEventListener('timeupdate', () => {
      const cur = audio.currentTime;
      const dur = audio.duration;

      dom.currentTimeLabel.textContent = formatTime(cur);
      if (dur && !isNaN(dur)) {
        dom.totalDurationLabel.textContent = formatTime(dur);
        dom.seekSlider.value = (cur / dur) * 100;
      }

      // Synchronize chaupai highlighting if on Chalisa tab
      if (state.activeTab === 'chalisa') {
        syncChaupaiHighlight(cur);
      }
    });

    // Chalte hue audio par body class: baaki chaupaiyan halki dikhane ke liye
    audio.addEventListener('play', () => dom.body.classList.add('audio-playing'));
    audio.addEventListener('pause', () => dom.body.classList.remove('audio-playing'));
    audio.addEventListener('ended', () => dom.body.classList.remove('audio-playing'));

    audio.addEventListener('loadedmetadata', () => {
      dom.totalDurationLabel.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('ended', () => {
      if (!state.isLooping) {
        state.isPlaying = false;
        dom.btnPlayMaster.innerHTML = '▶︎';
        dom.audioSpectrum.classList.remove('playing');
        clearHighlights();
      }
    });

       // ऑडियो की त्रुटि पहचानें और कारण हिंदी में दिखाएँ
    audio.addEventListener('error', () => {
      const error = audio.error;
      let message = 'ऑडियो चलाने में समस्या आ गई।';

      if (error) {
        switch (error.code) {
          case MediaError.MEDIA_ERR_ABORTED:
            message = 'ऑडियो चलना रोक दिया गया। दोबारा प्रयास करें।';
            break;

          case MediaError.MEDIA_ERR_NETWORK:
            message = navigator.onLine
              ? 'ऑडियो लोड नहीं हो पाया। कुछ देर बाद दोबारा प्रयास करें।'
              : 'इंटरनेट उपलब्ध नहीं है। ऑफलाइन ऑडियो की उपलब्धता जाँचें।';
            break;

          case MediaError.MEDIA_ERR_DECODE:
            message = 'ऑडियो फ़ाइल पढ़ने में समस्या आ रही है।';
            break;

          case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
            message = 'ऑडियो फ़ाइल नहीं मिली या यह चलने योग्य नहीं है।';
            break;
        }
      }

      console.error('ऑडियो त्रुटि:', {
        code: error ? error.code : null,
        source: audio.currentSrc,
        online: navigator.onLine,
        networkState: audio.networkState,
        readyState: audio.readyState
      });

      showToast(message, '⚠️', 8000);
    });

    // Seek Slider Event
    dom.seekSlider.addEventListener('input', (e) => {
      const dur = audio.duration;
      if (dur && !isNaN(dur)) {
        audio.currentTime = (e.target.value / 100) * dur;
      }
    });

    // Playback Speed Toggle (0.75x -> 1.0x -> 1.25x -> 1.5x)
    const speeds = [0.75, 1.0, 1.25, 1.5];
    dom.btnSpeed.addEventListener('click', () => {
      const nextIdx = (speeds.indexOf(state.speed) + 1) % speeds.length;
      state.speed = speeds[nextIdx];
      audio.playbackRate = state.speed;
      dom.btnSpeed.textContent = `${state.speed}x`;
      showToast(`गति: ${state.speed}x`);
    });

    // Repeat / Loop Toggle
    dom.btnRepeat.addEventListener('click', () => {
      state.isLooping = !state.isLooping;
      audio.loop = state.isLooping;
      dom.btnRepeat.classList.toggle('active', state.isLooping);
      showToast(state.isLooping ? 'लूप चालू (Repeat On)' : 'लूप बंद (Repeat Off)');
    });

    // Auto-Scroll Toggle
    dom.btnAutoScroll.addEventListener('click', () => {
      state.autoScroll = !state.autoScroll;
      dom.btnAutoScroll.classList.toggle('active', state.autoScroll);
      showToast(state.autoScroll ? 'ऑटो-स्क्रॉल चालू' : 'ऑटो-स्क्रॉल बंद');
    });

    // Volume Slider
    if (dom.volumeSlider) {
      dom.volumeSlider.addEventListener('input', (e) => {
        const vol = parseFloat(e.target.value);
        audio.volume = vol;
        state.isMuted = vol === 0;
        updateMuteButtonUI();
      });
    }

    // Mute Button
    dom.btnMute.addEventListener('click', () => {
      state.isMuted = !state.isMuted;
      audio.muted = state.isMuted;
      updateMuteButtonUI();
    });

    // Local Custom Audio File Picker
    dom.btnChooseAudio.addEventListener('click', () => {
      dom.customAudioInput.click();
    });

    dom.customAudioInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const fileUrl = URL.createObjectURL(file);
        audio.src = fileUrl;
        audio.play().then(() => {
          dom.audioTrackName.textContent = file.name;
          dom.audioSourceChip.textContent = "लोकल MP3";
          showToast(`ऑडियो लोड हुआ: ${file.name}`);
        }).catch(err => {
          showToast('ऑडियो प्ले करने में त्रुटि!');
        });
      }
    });

    // Bottom Player Dock Collapse/Expand
    dom.dockCollapseBar.addEventListener('click', () => {
      dom.playerDock.classList.toggle('collapsed');
    });
  }

  function togglePlayPause() {
    const audio = dom.audioElement;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((err) => {
        console.warn('Playback blocked or failed:', err);
        showToast('प्ले करने के लिए स्क्रीन छुएं');
      });
    } else {
      audio.pause();
    }
  }

  function updateMuteButtonUI() {
    if (state.isMuted) {
      dom.btnMute.innerHTML = '🔇';
      dom.btnMute.title = 'अनम्यूट करें';
      if (dom.volumeSlider) dom.volumeSlider.value = 0;
    } else {
      dom.btnMute.innerHTML = '🔊';
      dom.btnMute.title = 'म्यूट करें';
      if (dom.volumeSlider) dom.volumeSlider.value = dom.audioElement.volume || 1;
    }
  }

  /* ==========================================================================
     7. CHAUPAI LIVE SYNC & SMART AUTO-SCALING ENGINE (स्मार्ट टाइम-स्केलिंग)
     ========================================================================== */

  const BASE_REFERENCE_DURATION = 180; // 3 minutes baseline calibration
  let isUserInteractingWithScroll = false;
  let userScrollTimeout = null;

  function markUserScrolling() {
    isUserInteractingWithScroll = true;
    clearTimeout(userScrollTimeout);
    userScrollTimeout = setTimeout(() => {
      isUserInteractingWithScroll = false;
    }, 3500); // Resume auto-scroll 3.5s after user stops touching
  }

  function getAudioTimeScale() {
    const audio = dom.audioElement;
    if (audio && audio.duration && !isNaN(audio.duration) && audio.duration > 30) {
      return audio.duration / BASE_REFERENCE_DURATION;
    }
    return 1.0;
  }

  function syncChaupaiHighlight(currentTime) {
    let activeCard = null;
    const scale = getAudioTimeScale();

    // 1. Check Opening Dohas (with auto-proportional scaling)
    for (const doha of CHALISA_DATA.openingDohas) {
      const scaledStart = doha.start * scale;
      const scaledEnd = doha.end * scale;
      if (currentTime >= scaledStart && currentTime < scaledEnd) {
        activeCard = document.getElementById(doha.id);
        break;
      }
    }

    // 2. Check 40 Chaupais (with auto-proportional scaling)
    if (!activeCard) {
      for (const chaupai of CHALISA_DATA.chaupais) {
        const scaledStart = chaupai.start * scale;
        const scaledEnd = chaupai.end * scale;
        if (currentTime >= scaledStart && currentTime < scaledEnd) {
          activeCard = document.getElementById(`chaupai-${chaupai.num}`);
          break;
        }
      }
    }

    // 3. Check Closing Doha (with auto-proportional scaling)
    if (!activeCard) {
      const closing = CHALISA_DATA.closingDoha;
      const scaledStart = closing.start * scale;
      const scaledEnd = closing.end * scale;
      if (currentTime >= scaledStart && currentTime <= scaledEnd) {
        activeCard = document.getElementById(closing.id);
      }
    }

    if (activeCard && !activeCard.classList.contains('active-playback')) {
      clearHighlights();
      activeCard.classList.add('active-playback');
      dom.body.classList.add('has-active-verse');

      // Scroll strictly according to song progress, centered in visible reading window
      if (state.autoScroll && !isUserInteractingWithScroll) {
        scrollToVerseCard(activeCard);
      }
    } else if (!activeCard) {
      clearHighlights();
    }
  }

  // Centering card directly in the visible reading area (between sticky top nav and bottom audio dock)
  function scrollToVerseCard(card) {
    if (!card) return;
    const navContainer = document.querySelector('.sangrah-nav-container');
    const dock = document.getElementById('audioPlayerDock');

    const topOffset = navContainer ? navContainer.getBoundingClientRect().bottom : 70;
    const bottomDockHeight = dock ? (window.innerHeight - dock.getBoundingClientRect().top) : 130;

    const cardRect = card.getBoundingClientRect();
    const cardTopAbsolute = cardRect.top + window.scrollY;

    const visibleHeight = window.innerHeight - topOffset - bottomDockHeight;
    const targetY = cardTopAbsolute - topOffset - (visibleHeight - cardRect.height) / 2;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  }

  function clearHighlights() {
    const active = document.querySelectorAll('.verse-card.active-playback');
    active.forEach(el => el.classList.remove('active-playback'));
    dom.body.classList.remove('has-active-verse');
  }

  // Jump Audio directly to specific Chaupai / Doha (Tap-to-Sync)
  function seekToVerse(baseStartSecond, label) {
    const audio = dom.audioElement;
    if (!audio) return;
    const scale = getAudioTimeScale();
    const targetTime = baseStartSecond * scale;

    if (audio.duration && targetTime <= audio.duration) {
      audio.currentTime = targetTime;
      if (audio.paused) {
        audio.play().catch(e => console.log('Autoplay blocked:', e));
      }
      showToast(`${label} पर सिंक किया गया 🎵`);
    }
  }

  /* ==========================================================================
     8. VIEW MODES & FONT SIZE SCALING
     ========================================================================== */

  function setViewMode(mode) {
    state.viewMode = mode;
    dom.viewModeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    dom.body.classList.remove('mode-text-only', 'mode-audio-only');
    if (mode === 'text-only') {
      dom.body.classList.add('mode-text-only');
      showToast('केवल पाठ मोड (Text-only)');
    } else if (mode === 'audio-only') {
      dom.body.classList.add('mode-audio-only');
      showToast('केवल श्रवण मोड (Audio-only)');
    } else {
      showToast('समन्वित मोड (Text + Audio)');
    }
  }

  function applyFontScale(scale, announce) {
    const clamped = Math.min(Math.max(scale, 0.8), 2.0);
    state.fontScale = Math.round(clamped * 10) / 10;
    document.documentElement.style.setProperty('--font-scale', `${state.fontScale}rem`);
    try { localStorage.setItem('agy_hanuman_font_scale', state.fontScale.toString()); } catch (e) {}
    if (announce) {
      showToast(`अक्षर आकार: ${Math.round(state.fontScale * 100)}%`);
    }
  }

  /* ==========================================================================
     9. THEME SWITCHER (Light / Celestial Night Dark Mode)
     ========================================================================== */

  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('agy_hanuman_theme', theme);

    if (theme === 'dark') {
      dom.themeToggleBtn.innerHTML = '☀️';
      dom.themeToggleBtn.title = 'दिन का रूप (Light Mode)';
    } else {
      dom.themeToggleBtn.innerHTML = '🌙';
      dom.themeToggleBtn.title = 'रात्रि भक्ति (Dark Mode)';
    }
  }

  function toggleTheme() {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(nextTheme === 'dark' ? 'रात्रि भक्ति मोड सक्रिय' : 'दिन का रूप सक्रिय');
  }

  /* ==========================================================================
     10. DIGITAL JAAP MALA COUNTER (१०८ मनकों की दिव्य जप माला)
     ========================================================================== */

  function initJaapCounter() {
    updateJaapUI();

    dom.jaapCounterDisplay.addEventListener('click', () => {
      state.jaapCount++;
      playTempleBellChime(587.33, 0.6); // Bell sound on bead tap

      if (navigator.vibrate) {
        navigator.vibrate(40); // Haptic feedback
      }

      // Check if 108 Mala completed
      if (state.jaapCount >= 108) {
        state.jaapCount = 0;
        state.malaCount++;
        playTempleBellChime(880, 2.0); // Grand temple bell sound on mala finish
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 150]);
        }
        showToast('॥ १ माला (१०८ जप) पूर्ण! ॥');
      }

      localStorage.setItem('agy_hanuman_jaap_count', state.jaapCount.toString());
      localStorage.setItem('agy_hanuman_mala_count', state.malaCount.toString());
      updateJaapUI();
    });

    dom.jaapResetBtn.addEventListener('click', () => {
      showCustomConfirm(
        'जप माला रीसेट',
        'क्या आप वर्तमान जप संख्या को शून्य (0) पर रीसेट करना चाहते हैं?',
        () => {
          state.jaapCount = 0;
          localStorage.setItem('agy_hanuman_jaap_count', '0');
          updateJaapUI();
          showToast('जप काउंटर शून्य पर रीसेट किया गया 🔄');
        }
      );
    });
  }

  function updateJaapUI() {
    dom.jaapBigNumber.textContent = state.jaapCount;
    dom.jaapStatMala.textContent = state.malaCount;
    dom.jaapStatLifetime.textContent = (state.malaCount * 108) + state.jaapCount;
  }

  /* ==========================================================================
     11. BOOKMARKS, CLIPBOARD COPY & WEB SHARE
     ========================================================================== */

  window.hanumanApp = {
    seekTo: function (startSec, label) {
      seekToVerse(startSec, label);
    },

    toggleBhavarth: function (id) {
      const el = document.getElementById(`bhavarth-${id}`);
      if (el) {
        el.classList.toggle('visible');
      }
    },

    toggleBookmark: function (id, label) {
      const idx = state.bookmarks.indexOf(id);
      if (idx > -1) {
        state.bookmarks.splice(idx, 1);
        showToast(`${label} बुकमार्क हटाया`);
      } else {
        state.bookmarks.push(id);
        showToast(`${label} बुकमार्क किया गया ★`);
      }
      localStorage.setItem('agy_hanuman_bookmarks', JSON.stringify(state.bookmarks));
      renderChalisa(); // Re-render to update bookmark stars
    },

    copyVerse: function (id) {
      const card = document.getElementById(id);
      if (!card) return;
      const textElem = card.querySelector('.verse-text');
      const text = textElem ? textElem.innerText : '';
      const fullText = `॥ श्री हनुमान जी ॥\n\n${text}\n\nजय श्री राम! जय हनुमान!`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(fullText).then(() => {
          showToast('पवित्र पाठ कॉपी हो गया! 📋');
        }).catch(() => {
          fallbackCopyText(fullText);
        });
      } else {
        fallbackCopyText(fullText);
      }
    },

    shareVerse: function (id) {
      const card = document.getElementById(id);
      if (!card) return;
      const textElem = card.querySelector('.verse-text');
      const text = textElem ? textElem.innerText : '';
      const shareData = {
        title: 'श्री हनुमान भक्ति संग्रह',
        text: `॥ श्री हनुमान जी ॥\n\n${text}\n\nजय श्री राम! जय हनुमान!\n`
      };

      if (navigator.share) {
        navigator.share(shareData).catch((err) => console.log('Share canceled', err));
      } else {
        this.copyVerse(id);
        showToast('शेयर हेतु टेक्स्ट कॉपी कर लिया गया है!');
      }
    }
  };

  function fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast('पवित्र पाठ कॉपी हो गया! 📋');
    } catch (err) {
      showToast('कॉपी करने में असमर्थ!');
    }
    document.body.removeChild(textarea);
  }

  function showBookmarksModal() {
    dom.modalTitle.textContent = "पसंदीदा / बुकमार्क की गई चौपाइयाँ";
    if (state.bookmarks.length === 0) {
      dom.modalBody.innerHTML = `
        <div style="text-align:center; padding: 24px 12px; color: var(--text-muted);">
          <p style="font-size: 1.8rem; margin-bottom: 8px;">☆</p>
          <p>अभी कोई चौपाई बुकमार्क नहीं की गई है।</p>
          <p style="font-size: 0.85rem; margin-top: 4px;">किसी भी चौपाई के ऊपर बने स्टार '☆' पर क्लिक करके उसे यहाँ सेव करें।</p>
        </div>
      `;
    } else {
      let html = `<div style="display:flex; flex-direction:column; gap:12px;">`;
      state.bookmarks.forEach(id => {
        const card = document.getElementById(id);
        if (card) {
          const badge = card.querySelector('.verse-badge') ? card.querySelector('.verse-badge').textContent : '';
          const text = card.querySelector('.verse-text') ? card.querySelector('.verse-text').innerHTML : '';
          html += `
            <div style="background:var(--bg-card-alt); border:1px solid var(--border-card); border-radius:8px; padding:12px;">
              <div style="font-size:0.8rem; font-weight:700; color:var(--saffron-primary); margin-bottom:4px;">${badge}</div>
              <div style="font-size:0.95rem; line-height:1.6; color:var(--text-primary);">${text}</div>
            </div>
          `;
        }
      });
      html += `</div>`;
      dom.modalBody.innerHTML = html;
    }
    dom.modalOverlay.classList.add('open');
  }

  /* ==========================================================================
     12. READING PROGRESS BAR
     ========================================================================== */

  function updateReadingProgress() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollTotal > 0) {
      const progress = (window.scrollY / scrollTotal) * 100;
      dom.progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
  }

  /* ==========================================================================
     13. TOAST & CUSTOM IN-APP CONFIRM NOTIFICATIONS (NO UGLY BROWSER ALERTS)
     ========================================================================== */

  let toastTimer = null;
  function showToast(message, icon = "🪔") {
    if (!dom.toastMsg) return;
    dom.toastMsg.innerHTML = `<span style="font-size:1.15rem; filter: drop-shadow(0 0 4px #FFD700);">${icon}</span> <span>${message}</span>`;
    dom.toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toastMsg.classList.remove('show');
    }, 2800);
  }

  function showCustomConfirm(title, message, onConfirm) {
    dom.modalTitle.textContent = title;
    dom.modalBody.innerHTML = `
      <div class="custom-confirm-box">
        <span class="custom-confirm-icon">📿</span>
        <h4 class="custom-confirm-title">${title}</h4>
        <p class="custom-confirm-desc">${message}</p>
        <div class="custom-confirm-actions">
          <button id="btnConfirmCancel" class="btn-confirm-no">रद्द करें</button>
          <button id="btnConfirmProceed" class="btn-confirm-yes">हाँ, रीसेट करें</button>
        </div>
      </div>
    `;
    dom.modalOverlay.classList.add('open');

    const cancelBtn = document.getElementById('btnConfirmCancel');
    const proceedBtn = document.getElementById('btnConfirmProceed');

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        dom.modalOverlay.classList.remove('open');
      };
    }

    if (proceedBtn) {
      proceedBtn.onclick = () => {
        dom.modalOverlay.classList.remove('open');
        if (typeof onConfirm === 'function') {
          onConfirm();
        }
      };
    }
  }

  /* ==========================================================================
     14. TABS & EVENT LISTENERS SETUP
     ========================================================================== */

  function switchTab(tabKey) {
    state.activeTab = tabKey;

    dom.tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabKey);
    });

    Object.keys(dom.sections).forEach(key => {
      if (dom.sections[key]) {
        dom.sections[key].classList.toggle('active', key === tabKey);
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initEventListeners() {
    // Tab Clicks
    dom.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Theme Toggle
    dom.themeToggleBtn.addEventListener('click', toggleTheme);

    // Bookmarks Modal
    dom.bookmarksBtn.addEventListener('click', showBookmarksModal);
    dom.modalCloseBtn.addEventListener('click', () => dom.modalOverlay.classList.remove('open'));
    dom.modalOverlay.addEventListener('click', (e) => {
      if (e.target === dom.modalOverlay) dom.modalOverlay.classList.remove('open');
    });

    // Font Controls
    dom.fontDecBtn.addEventListener('click', () => applyFontScale(state.fontScale - 0.1, true));
    dom.fontIncBtn.addEventListener('click', () => applyFontScale(state.fontScale + 0.1, true));
    dom.fontResetBtn.addEventListener('click', () => applyFontScale(1.0, true));

    // View Mode Selector
    dom.viewModeButtons.forEach(btn => {
      btn.addEventListener('click', () => setViewMode(btn.dataset.mode));
    });

    // Bhavarth Toggle All
    dom.bhavarthToggleAllBtn.addEventListener('click', () => {
      state.showAllBhavarth = !state.showAllBhavarth;
      dom.bhavarthToggleAllBtn.classList.toggle('active', state.showAllBhavarth);
      const allBhavarths = document.querySelectorAll('.verse-bhavarth');
      allBhavarths.forEach(el => {
        el.classList.toggle('visible', state.showAllBhavarth);
      });
      showToast(state.showAllBhavarth ? 'सभी भावार्थ दिखाए गए' : 'भावार्थ संकुचित किए गए');
    });

    // Window Scroll - Progress Bar
    window.addEventListener('scroll', updateReadingProgress, { passive: true });

    // Keyboard Accessibility Controls
    window.addEventListener('keydown', (e) => {
      // Space: Play/Pause audio (if not typing in an input)
      if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        togglePlayPause();
      }
      // 'M' key: Mute/Unmute
      if (e.key === 'm' || e.key === 'M') {
        state.isMuted = !state.isMuted;
        dom.audioElement.muted = state.isMuted;
        updateMuteButtonUI();
      }
    });
  }

  /* ==========================================================================
     15. SERVICE WORKER REGISTRATION (OFFLINE PWA)
     ========================================================================== */

  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => console.log('[PWA] Service Worker registered:', reg.scope))
          .catch((err) => console.warn('[PWA] Service Worker registration failed:', err));
      });
    }
  }

  /* ==========================================================================
     15b. SCREEN WAKE LOCK (ऐप खुली रहने तक स्क्रीन ऑन)
     ========================================================================== */

  let wakeLockSentinel = null;

  async function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    if (document.visibilityState !== 'visible') return;
    if (wakeLockSentinel && !wakeLockSentinel.released) return;
    try {
      wakeLockSentinel = await navigator.wakeLock.request('screen');
      wakeLockSentinel.addEventListener('release', () => { wakeLockSentinel = null; });
    } catch (err) {
      console.warn('[WakeLock] request failed:', err && err.message);
    }
  }

  function initWakeLock() {
    requestWakeLock();

    // ऐप पर वापस आने पर (टैब बदलने / लॉक के बाद) फिर से चालू करें
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') requestWakeLock();
    });

    // कुछ ब्राउज़र (जैसे iOS Safari) पहले स्पर्श के बाद ही अनुमति देते हैं
    ['click', 'touchstart', 'keydown'].forEach((evt) => {
      document.addEventListener(evt, requestWakeLock, { passive: true });
    });
  }

  /* ==========================================================================
     16. INITIALIZATION BOOTSTRAP
     ========================================================================== */

  function init() {
    applyTheme(state.theme);
    applyFontScale(state.fontScale);

    renderChalisa();
    renderBajrangBaan();
    renderAshtak();
    renderAarti();
    renderNamavali();

    initAudioPlayer();
    initJaapCounter();
    initEventListeners();
    registerServiceWorker();
    initWakeLock();

    console.log('॥ श्री हनुमान जी महाराज की जय ॥ App initialized successfully.');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();