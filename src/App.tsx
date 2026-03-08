import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Papa from 'papaparse';
import { Maximize, MoreVertical, RefreshCw, Shuffle, Download, Trash2, ArrowLeft, ArrowRight, X, Check, Sparkles, Upload, FileCode } from 'lucide-react';

const defaultCSVData = `欧洲装配式建筑的发展始于第二次世界大战后，主要是为了解决什么问题？,解决战后大量房屋损坏导致的居住问题（“房荒”现象）。
2012年由国际结构混凝土协会发布的、对混凝土结构规范修订具有引领作用的模式规范是_____。,MC 2010
发达国家装配式建筑的发展主要经历了初级阶段、发展阶段和_____。,成熟阶段
在装配式建筑成熟阶段，其行业特征主要表现为_____、技术先进，追求高质量与低能耗。,工业化规模程度高
美国在20世纪70年代能源危机期间开始实施装配化施工，其主要目的是推行_____。,机械化生产
法国建筑工业化以混凝土体系为主，钢结构和木结构体系为辅，主要采用_____体系。,框架或板柱
德国的装配式住宅主要采用叠合板、混凝土、_____结构体系。,剪力墙
瑞典和丹麦的新建住宅中，通用部件的占比达到了多少？,80%
丹麦推行建筑工业化的途径是以_____为标准的体系，使部件达到标准化。,产品目录
日本在1963年成立了哪个协会，专门推进日本预制技术的发展？,日本预制建筑协会（JPA）
新加坡的装配式建筑以_____结构为主。,剪力墙
新加坡政府建造的“组屋”项目中，强制装配率达到了多少？,70%
我国装配式建筑在20世纪90年代后期由于各种原因，预制混凝土构件生产经历了研究、快速发展、使用和_____等阶段。,发展停滞
2016年9月27日，国务院办公厅印发的关于发展装配式建筑的指导意见要求以哪些地区为重点推进地区？,京津冀、长三角、珠三角三大城市群。
新型装配式建筑是建筑业的一场革命，它是_____、生产方式的变革。,生产力
装配式建筑的含义是以_____为模式，以标准化设计、工厂化生产、装配化施工等为特征的建筑。,构件工厂预制、现场装配式安装
装配整体式建筑是指由_____相结合的方法建造的钢筋混凝土建筑。,预制和现浇
预制楼板类构件主要包括预制实心板、预制空心板和_____等。,预制叠合板
预制墙体类构件主要包括预制实心剪力墙、预制空心墙、_____及预制内隔墙等。,预制剪力墙
其他复杂异形预制构件包括预制飘窗、预制空调板、预制整体厨房卫生间以及_____等。,预制带窗剪力墙
评价装配式建筑的重要指标是_____。,装配率
装配率计算公式中，$P$ 代表什么？,装配率
装配率计算公式为 $P = \\frac{Q_1 + Q_2 + Q_3}{100 - Q_4} \\times 100\\%$，其中 $Q_1$ 指的是什么？,主体结构指标实际得分值。
装配率计算公式中，$Q_2$ 代表什么得分值？,围护墙和内隔墙指标。
在装配率评价分值表中，“主体结构”项的总分值是多少？,50分
装配率评分中，“柱、支撑、承重墙等竖向构件”的评价要求是预制比例需在什么范围内？,$35\\% \\le \\text{比例} \\le 80\\%$
在围护墙和内隔墙评分中，非承重围护墙非砌筑的评价比例要求是_____。,比例 $\\ge 80\\%$
装修和设备管线指标中，“集成厨房”的评价分值区间是多少？,3~6分
装修和设备管线指标中，“管线分离”的评价比例要求是多少？,$50\\% \\le \\text{比例} \\le 70\\%$
申请装配式建筑等级评价时，主体结构竖向构件中预制部品部件的应用比例不得低于多少？,35%
装配式建筑等级评价要求中，主体结构部分的评价分值不应低于多少分？,20分
装配式建筑等级评价中，围护墙和内隔墙部分的评价分值不应低于多少分？,10分
装配式建筑评价等级为 A 级时，其装配率范围是多少？,60%~75%
装配式建筑评价等级为 AA 级时，其装配率范围是多少？,76%~90%
装配式建筑评价等级为 AAA 级时，其装配率需达到多少？,91%及以上
在预制构件中起到保温、减重、吊装、连接等作用而预先安装的物件统称为什么？,预埋件
预埋件按用途分类中，用于现场支模、支撑、吊装的预埋件属于哪一类？,支模吊装件
预埋件中，起到保温、减重作用，或填充预留缺口的预埋件属于哪一类？,填充物
由工厂生产构成围护系统、设备与管线系统、内装系统的建筑单一产品或复合产品组装而成的功能单元统称为什么？,部品部件
装配整体式框架结构的主要受力框架由哪些预制构件组成？,预制柱、预制叠合梁。
装配整体式框架结构适用于高度为多少米以下的建筑？,50m
装配整体式框架结构的底柱宜采用哪种施工方式？,现浇混凝土
当前国内的装配式框架-剪力墙结构中，剪力墙通常采用哪种方式建造？,现浇
在装配整体式框架-现浇剪力墙结构中，哪些构件通常采用预制？,框架梁、框架柱、楼板、楼梯、阳台等。
对于高烈度地震地区，框架-剪力墙结构宜选择什么样的平面布置以发挥其抗侧刚度？,“一字形”或“回字形”平面布置。
在框架-剪力墙结构中，不宜选择什么样的平面布置？,“L形”平面布置。
保证框架梁柱在大震作用下变形的前提是什么？,具有良好承载力及延性的梁柱节点。
预制楼梯类构件根据图 0-0-3 所示，除了包括预制楼梯段外，还包括什么？,预制休息平台
在评价装配式建筑时，必须采用哪种装修方式才能参与等级评价？,全装修
装配率计算公式中的 $Q_4$ 指的是什么？,评价项目中缺少的评价项分值总和。`;

interface Flashcard {
  question: string;
  answer: string;
}

export default function App() {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [deckName, setDeckName] = useState('装配卡片');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load default data
    parseCSV(defaultCSVData);
    
    // Handle click outside menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Handle fullscreen change
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const parseCSV = (csvText: string) => {
    Papa.parse(csvText, {
      complete: (results) => {
        const parsedCards: Flashcard[] = results.data
          .filter((row: any) => row.length >= 2 && row[0].trim() !== '')
          .map((row: any) => ({
            question: row[0].trim(),
            answer: row[1].trim(),
          }));
        if (parsedCards.length > 0) {
          setCards(parsedCards);
          resetState();
        }
      },
      skipEmptyLines: true,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDeckName(file.name.replace('.csv', ''));
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        parseCSV(text);
      };
      reader.readAsText(file);
    }
    setIsMenuOpen(false);
  };

  const resetState = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setCorrectCount(0);
    setIncorrectCount(0);
  };

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  const handleCorrect = () => {
    setCorrectCount(prev => prev + 1);
    nextCard();
  };

  const handleIncorrect = () => {
    setIncorrectCount(prev => prev + 1);
    nextCard();
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const shuffleDeck = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    resetState();
    setIsMenuOpen(false);
  };

  const restartDeck = () => {
    resetState();
    setIsMenuOpen(false);
  };

  const downloadDeck = () => {
    const csvContent = cards.map(c => `"${c.question.replace(/"/g, '""')}","${c.answer.replace(/"/g, '""')}"`).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${deckName}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };

  const exportStandaloneHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${deckName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    .preserve-3d { transform-style: preserve-3d; }
    .perspective-1000 { perspective: 1000px; }
    .backface-hidden { backface-visibility: hidden; }
    .rotate-y-180 { transform: rotateY(180deg); }
    .card-transition { transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
  </style>
</head>
<body class="min-h-screen bg-[#f8f9fa] flex flex-col items-center py-8 px-4 font-sans selection:bg-blue-100">
  <div class="w-full max-w-3xl flex justify-between items-start mb-6">
    <div class="flex flex-col">
      <h1 class="text-2xl font-semibold text-gray-900">${deckName}</h1>
      <span class="text-sm text-gray-500 mt-1" id="source-count">Based on ${cards.length} sources</span>
    </div>
  </div>

  <div class="w-full max-w-3xl flex-1 flex flex-col items-center justify-center perspective-1000 relative min-h-[400px]">
    <div id="card-inner" class="w-full aspect-[4/3] sm:aspect-[16/10] relative preserve-3d cursor-pointer card-transition">
      <!-- Front -->
      <div class="absolute inset-0 backface-hidden bg-[#2d2d2d] rounded-3xl shadow-lg flex flex-col p-6 sm:p-10 border border-gray-800">
        <div class="flex justify-between items-start text-gray-400">
          <span class="text-sm font-medium" id="progress-text">1 / ${cards.length}</span>
        </div>
        <div class="flex-1 flex items-center justify-center text-center">
          <h3 class="text-2xl sm:text-4xl font-medium text-white leading-tight px-4" id="question-text"></h3>
        </div>
        <div class="text-center text-gray-500 text-sm pb-2">查看答案</div>
      </div>
      <!-- Back -->
      <div class="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl shadow-lg flex flex-col p-6 sm:p-10 border border-gray-200">
        <div class="flex-1 flex flex-col justify-center">
          <h3 class="text-3xl sm:text-5xl font-medium text-gray-900 mb-8" id="answer-text"></h3>
        </div>
      </div>
    </div>
  </div>

  <div class="w-full max-w-3xl mt-8 flex items-center justify-center gap-4 sm:gap-8">
    <button id="btn-prev" class="w-14 h-14 flex items-center justify-center rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-30 transition-colors">
      <i data-lucide="arrow-left"></i>
    </button>
    <button id="btn-incorrect" class="h-14 px-6 flex items-center justify-center gap-2 rounded-full border border-red-100 bg-white text-red-500 hover:bg-red-50 shadow-sm transition-colors font-medium text-lg">
      <i data-lucide="x"></i> <span id="incorrect-count">0</span>
    </button>
    <button id="btn-correct" class="h-14 px-6 flex items-center justify-center gap-2 rounded-full border border-green-100 bg-white text-green-600 hover:bg-green-50 shadow-sm transition-colors font-medium text-lg">
      <span id="correct-count">0</span> <i data-lucide="check"></i>
    </button>
    <button id="btn-next" class="w-14 h-14 flex items-center justify-center rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-30 transition-colors">
      <i data-lucide="arrow-right"></i>
    </button>
  </div>

  <script>
    const cards = ${JSON.stringify(cards).replace(/</g, '\\u003c')};
    let currentIndex = 0;
    let isFlipped = false;
    let correctCount = 0;
    let incorrectCount = 0;

    const cardInner = document.getElementById('card-inner');
    const questionText = document.getElementById('question-text');
    const answerText = document.getElementById('answer-text');
    const progressText = document.getElementById('progress-text');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const btnCorrect = document.getElementById('btn-correct');
    const btnIncorrect = document.getElementById('btn-incorrect');
    const correctCountEl = document.getElementById('correct-count');
    const incorrectCountEl = document.getElementById('incorrect-count');

    function updateUI() {
      const card = cards[currentIndex];
      questionText.textContent = card.question;
      answerText.textContent = card.answer;
      progressText.textContent = (currentIndex + 1) + ' / ' + cards.length;
      
      btnPrev.disabled = currentIndex === 0;
      btnNext.disabled = currentIndex === cards.length - 1;
      
      correctCountEl.textContent = correctCount;
      incorrectCountEl.textContent = incorrectCount;

      if (isFlipped) {
        cardInner.classList.add('rotate-y-180');
      } else {
        cardInner.classList.remove('rotate-y-180');
      }
      lucide.createIcons();
    }

    function flipCard() {
      isFlipped = !isFlipped;
      updateUI();
    }

    function nextCard() {
      if (currentIndex < cards.length - 1) {
        isFlipped = false;
        updateUI();
        setTimeout(() => {
          currentIndex++;
          updateUI();
        }, 150);
      }
    }

    function prevCard() {
      if (currentIndex > 0) {
        isFlipped = false;
        updateUI();
        setTimeout(() => {
          currentIndex--;
          updateUI();
        }, 150);
      }
    }

    cardInner.addEventListener('click', flipCard);
    btnNext.addEventListener('click', nextCard);
    btnPrev.addEventListener('click', prevCard);
    
    btnCorrect.addEventListener('click', () => {
      correctCount++;
      nextCard();
    });
    
    btnIncorrect.addEventListener('click', () => {
      incorrectCount++;
      nextCard();
    });

    // Init
    updateUI();
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${deckName}.html`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setIsMenuOpen(false);
  };

  const deleteDeck = () => {
    setCards([]);
    resetState();
    setIsMenuOpen(false);
  };

  if (cards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">没有卡片</h2>
          <p className="text-gray-500 mb-6">请导入CSV文件以开始学习</p>
          <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center w-full gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition-colors"
          >
            <Upload size={20} />
            导入 CSV
          </button>
          <button 
            onClick={() => parseCSV(defaultCSVData)}
            className="mt-4 text-blue-600 hover:text-blue-800 text-sm underline"
          >
            加载默认装配卡片
          </button>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col items-center py-8 px-4 font-sans selection:bg-blue-100">
      {/* Header */}
      <div className="w-full max-w-3xl flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <input 
            type="text" 
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
            className="text-2xl font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-colors pb-1"
          />
          <span className="text-sm text-gray-500 mt-1">Based on {cards.length} sources</span>
        </div>
        <button 
          onClick={toggleFullscreen}
          className="p-2 text-gray-500 hover:bg-gray-200 rounded-lg transition-colors"
          title="全屏"
        >
          <Maximize size={20} />
        </button>
      </div>

      {/* Main Card Area */}
      <div className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center perspective-1000 relative">
        <motion.div
          className="w-full aspect-[4/3] sm:aspect-[16/10] relative preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 260, damping: 20 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front Face (Question) */}
          <div className="absolute inset-0 backface-hidden bg-[#2d2d2d] rounded-3xl shadow-lg flex flex-col p-6 sm:p-10 border border-gray-800">
            <div className="flex justify-between items-start text-gray-400">
              <span className="text-sm font-medium">{currentIndex + 1} / {cards.length}</span>
              
              {/* Menu Button & Dropdown */}
              <div className="relative" ref={menuRef}>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <MoreVertical size={20} />
                </button>
                
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button onClick={restartDeck} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <RefreshCw size={16} className="text-gray-500" /> 重新开始卡组
                      </button>
                      <button onClick={shuffleDeck} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Shuffle size={16} className="text-gray-500" /> 随机排序卡组
                      </button>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button onClick={() => fileInputRef.current?.click()} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Upload size={16} className="text-gray-500" /> 导入CSV
                      </button>
                      <button onClick={downloadDeck} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                        <Download size={16} className="text-gray-500" /> 下载CSV卡组
                      </button>
                      <button onClick={exportStandaloneHTML} className="w-full text-left px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 flex items-center gap-3 font-medium">
                        <FileCode size={16} className="text-blue-500" /> 导出为独立HTML应用
                      </button>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button onClick={deleteDeck} className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3">
                        <Trash2 size={16} className="text-red-500" /> 删除
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex-1 flex items-center justify-center text-center">
              <h3 className="text-2xl sm:text-4xl font-medium text-white leading-tight px-4">
                {currentCard.question}
              </h3>
            </div>
            
            <div className="text-center text-gray-500 text-sm pb-2">
              查看答案
            </div>
          </div>

          {/* Back Face (Answer) */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-3xl shadow-lg flex flex-col p-6 sm:p-10 border border-gray-200">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-3xl sm:text-5xl font-medium text-gray-900 mb-8">
                {currentCard.answer}
              </h3>
              <div>
                <button 
                  onClick={(e) => { e.stopPropagation(); /* Mock explain action */ }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <Sparkles size={16} />
                  解释
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-3xl mt-8 flex items-center justify-center gap-4 sm:gap-8">
        <button 
          onClick={prevCard}
          disabled={currentIndex === 0}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        
        <button 
          onClick={handleIncorrect}
          className="h-14 px-6 flex items-center justify-center gap-2 rounded-full border border-red-100 bg-white text-red-500 hover:bg-red-50 shadow-sm transition-colors font-medium text-lg"
        >
          <X size={20} /> {incorrectCount}
        </button>
        
        <button 
          onClick={handleCorrect}
          className="h-14 px-6 flex items-center justify-center gap-2 rounded-full border border-green-100 bg-white text-green-600 hover:bg-green-50 shadow-sm transition-colors font-medium text-lg"
        >
          {correctCount} <Check size={20} />
        </button>
        
        <button 
          onClick={nextCard}
          disabled={currentIndex === cards.length - 1}
          className="w-14 h-14 flex items-center justify-center rounded-full border border-blue-200 text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
        >
          <ArrowRight size={24} />
        </button>
      </div>
      
      {/* Hidden file input for menu upload */}
      <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
    </div>
  );
}
