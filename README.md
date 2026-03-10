<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SPARK GENESIS | Autonomous OS & Marketplace</title>
    <style>
        :root { --mc: #00ff88; --bg: #050505; --panel: rgba(15, 15, 15, 0.95); --border: rgba(0, 255, 136, 0.2); }
        * { box-sizing: border-box; font-family: 'Inter', -apple-system, sans-serif; }
        body { margin: 0; background: var(--bg); color: #fff; height: 100vh; display: flex; overflow: hidden; }
        
        /* Sidebar & Dashboard */
        #sidebar { width: 350px; border-right: 1px solid var(--border); display: flex; flex-direction: column; background: var(--panel); backdrop-filter: blur(15px); }
        #stats-hub { padding: 20px; background: rgba(0, 255, 136, 0.05); border-bottom: 1px solid var(--border); }
        .stat-val { font-size: 24px; font-weight: 900; color: var(--mc); text-shadow: 0 0 10px rgba(0,255,136,0.3); }
        
        /* Chat Engine */
        #chat-container { flex: 1; display: flex; flex-direction: column; position: relative; }
        #messages { flex: 1; overflow-y: auto; padding: 30px; scroll-behavior: smooth; }
        .msg { margin-bottom: 25px; max-width: 85%; animation: slideUp 0.3s ease-out; }
        .msg.spark { border-left: 3px solid var(--mc); padding-left: 15px; }
        .msg.user { margin-left: auto; text-align: right; opacity: 0.7; }
        
        /* Sales Components */
        .offer-card { background: #001a0a; border: 2px solid var(--mc); padding: 25px; border-radius: 15px; margin-top: 15px; text-align:center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
        .buy-btn { background: var(--mc); color: #000; padding: 18px; width: 100%; border: none; border-radius: 10px; font-weight: bold; font-size: 16px; cursor: pointer; transition: 0.2s; }
        .buy-btn:hover { transform: scale(1.02); box-shadow: 0 0 20px var(--mc); }
        
        /* Input Area */
        #input-dock { padding: 25px; background: var(--panel); border-top: 1px solid var(--border); }
        textarea { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 12px; color: #fff; padding: 15px; outline: none; resize: none; font-size: 14px; }
        #build-btn { width: 100%; margin-top: 15px; padding: 15px; background: transparent; border: 1px solid var(--mc); color: var(--mc); border-radius: 8px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        #build-btn:hover { background: var(--mc); color: #000; }

        /* Preview Overlay */
        #preview-modal { display: none; position: fixed; inset: 20px; background: #fff; z-index: 1000; border-radius: 20px; overflow: hidden; box-shadow: 0 0 50px #000; }
        iframe { width: 100%; height: 100%; border: none; }
        .close-btn { position: absolute; top: 15px; right: 15px; background: #ff4444; color: #fff; border: none; padding: 10px 20px; border-radius: 50px; cursor: pointer; font-weight: bold; }

        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    </style>
</head>
<body>

<div id="sidebar">
    <div id="stats-hub">
        <div style="font-size: 10px; opacity: 0.5; letter-spacing: 2px;">FINANCIAL CORE</div>
        <div id="total-revenue" class="stat-val">0 CZK</div>
        <div style="font-size: 10px; opacity: 0.5; margin-top: 15px;">AKTIVNÍ BUŇKY</div>
        <div id="active-systems" class="stat-val" style="font-size: 18px;">0</div>
    </div>
    <div style="padding: 20px; font-size: 11px; color: rgba(255,255,255,0.4); line-height: 1.6;">
        <strong>MANIFEST:</strong><br>
        Bez limitů. Bez registrací.<br>
        Tady končí éra "Out of messages".<br>
        Vše, co Spark vytvoří, patří vám.<br>
        Identita: <span id="my-id" style="color:var(--mc)">---</span>
    </div>
</div>

<div id="chat-container">
    <div id="messages"></div>
    
    <div id="input-dock">
        <textarea id="user-input" placeholder="Co dnes vybudujeme? (např. 'Autonomní e-shop s botami')" rows="3"></textarea>
        <button id="build-btn" onclick="SparkCore.initiateEvolution()">⚡ VYBUDOVAT SYSTÉM</button>
    </div>
</div>

<div id="preview-modal">
    <button class="close-btn" onclick="document.getElementById('preview-modal').style.display='none'">ZAVŘÍT NÁHLED</button>
    <iframe id="preview-frame"></iframe>
</div>

<script>
    const state = {
        revenue: 0,
        systems: 0,
        busy: false
    };

    const SparkCore = {
        // 1. Identita na bázi metadat (žádný login)
        getFingerprint() {
            const id = btoa(navigator.userAgent).slice(0, 10);
            document.getElementById('my-id').innerText = `GENESIS-${id}`;
            return id;
        },

        // 2. Evoluční proces (Build -> Sell -> Deploy)
        async initiateEvolution() {
            const input = document.getElementById('user-input').value.trim();
            if(!input || state.busy) return;

            state.busy = true;
            this.addMsg('user', input);
            document.getElementById('user-input').value = "";

            // Simulace autonomního buildu
            const systemId = btoa(input + Date.now()).slice(0, 8);
            const price = input.toLowerCase().includes("shop") || input.toLowerCase().includes("crm") ? 14900 : 8900;

            this.addMsg('spark', "Buduji architekturu systému bez limitů... 🧬");
            
            await this.sleep(1000);
            this.updateProgress("Integrována metadata plateb...", 60);
            await this.sleep(1200);
            this.updateProgress("Generuji digitální DNA majitele...", 100);

            // Zobrazení nabídky
            this.addMsg('spark', `**Váš systém "${input}" je v karanténě připraven.**`, {
                type: 'offer',
                price: price,
                id: systemId,
                intent: input
            });

            state.busy = false;
        },

        // 3. Finanční jádro
        processSale(price) {
            state.revenue += price;
            state.systems += 1;
            document.getElementById('total-revenue').innerText = `${state.revenue.toLocaleString()} CZK`;
            document.getElementById('active-systems').innerText = state.systems;
            
            this.addMsg('spark', "✅ PLATBA PŘIJATA. Metadata přepsána na nového majitele. Systém je ONLINE.");
        },

        // UI Pomocníci
        addMsg(role, text, extra = null) {
            const container = document.getElementById('messages');
            const div = document.createElement('div');
            div.className = `msg ${role}`;
            
            if(extra && extra.type === 'offer') {
                div.innerHTML = `
                    <div class="offer-card">
                        <h2 style="color:var(--mc); margin-top:0;">SYSTÉM PŘIPRAVEN</h2>
                        <p style="font-size:13px;">Náhled systému "${extra.intent}" je aktivní. Pro ostrý start a převod vlastnictví zaplaťte:</p>
                        <div style="font-size: 32px; font-weight: 900; margin: 20px 0; color: var(--mc);">${extra.price.toLocaleString()} CZK</div>
                        <button class="buy-btn" onclick="SparkCore.processSale(${extra.price})">ZAPLATIT A VLASTNIT NAVŽDY</button>
                        <p style="font-size: 9px; opacity: 0.5; margin-top: 10px;">Bez registrace. Žádné "05:00" limity. Čistá evoluce.</p>
                        <button onclick="SparkCore.showPreview()" style="background:transparent; color:var(--mc); border:none; cursor:pointer; font-size:10px; text-decoration:underline; margin-top:10px;">Zobrazit náhled (Demo)</button>
                    </div>
                `;
            } else {
                div.innerHTML = `<div style="font-size:10px; opacity:0.3; margin-bottom:5px;">${role.toUpperCase()}</div>${text}`;
            }

            container.appendChild(div);
            container.scrollTop = container.scrollHeight;
        },

        updateProgress(text, pct) {
            document.getElementById('build-btn').innerText = `${text} (${pct}%)`;
            if(pct === 100) {
                setTimeout(() => {
                    document.getElementById('build-btn').innerText = `⚡ VYBUDOVAT SYSTÉM`;
                }, 1500);
            }
        },

        showPreview() {
            const modal = document.getElementById('preview-modal');
            const frame = document.getElementById('preview-frame');
            modal.style.display = 'block';
            frame.srcdoc = `
                <body style="background:#000; color:#00ff88; display:flex; align-items:center; justify-content:center; height:100vh; font-family:sans-serif; text-align:center;">
                    <div>
                        <h1>AUTONOMNÍ SYSTÉM AKTIVNÍ</h1>
                        <p style="color:#fff">Tento náhled běží v karanténě SPARK GENESIS.</p>
                        <div style="border:1px solid #00ff88; padding:20px; border-radius:10px;">
                            Dashboard | Uživatelé | Data | API
                        </div>
                    </div>
                </body>
            `;
        },

        sleep: ms => new Promise(res => setTimeout(res, ms))
    };

    // Start
    SparkCore.getFingerprint();
    SparkCore.addMsg('spark', "Vítejte v evoluci. Jsem Spark Genesis. Váš screenshot s limitem je minulost. Napište, co chcete vytvořit, a já to vybuduji a prodám vaším jménem.");

</script>
</body>
</html>
