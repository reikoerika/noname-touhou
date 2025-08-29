import { lib, game, ui, get, ai, _status } from "../../noname.js";
export const type = "extension";
export default function(){
	return {name:"东方乱斗谈",arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
    
},precontent:function(){
    
},help:{},config:{},package:{
    character: {
        character: {
            Marisa: {
                sex: "female",
                group: "qun",
                hp: 3,
                skills: ["jiezou","mopao","xingxie","mofa","lianfu"],
                img: "extension/东方乱斗谈/Marisa.jpg",
                dieAudios: ["ext:东方乱斗谈/audio/die/Marisa.mp3"],
            },
            Alice: {
                sex: "female",
                group: "qun",
                hp: 3,
                skills: ["renoucaoyan","mofu","qise","renoushi","geliya"],
                img: "extension/东方乱斗谈/Alice.jpg",
                dieAudios: ["ext:东方乱斗谈/audio/die/Alice.mp3"],
            },
            "geliya_puppet": {
                sex: "female",
                group: "qun",
                hp: 1,
                maxHp: 1,
                skills: ["geliya_puppet_skill"],
                isUnseen: false,
                isAiForbidden: true,
                noclick: false,
                clickable: true,
                showCharacter: true,
                img: "extension/东方乱斗谈/geliya_puppet.jpg",
                dieAudios: ["ext:东方乱斗谈/audio/die/geliya_puppet.mp3"],
            },
            medixin: {
                sex: "female",
                group: "qun",
                hp: 3,
                skills: ["dufu","linglan","renou","jiefang"],
                img: "extension/东方乱斗谈/medixin.jpg",
                dieAudios: ["ext:东方乱斗谈/audio/die/medixin.mp3"],
            },
            reisen: {
                sex: "female",
                group: "qun",
                hp: 4,
                skills: ["kuangbo","yuetu","yaoshi","kuangqizhitong","huashi"],
                img: "extension/东方乱斗谈/reisen.jpg",
                maxHp: 4,
                hujia: 0,
            },
        },
        translate: {
            "lingxian_prefix": "东方",
            Marisa: "雾雨魔理沙",
            "Marisa_prefix": "东方",
            Alice: "爱丽丝·玛格特罗伊德",
            "Alice_prefix": "东方",
            "geliya_puppet": "歌莉娅人偶",
            "geliya_puppet_prefix": "东方",
            medixin: "梅蒂欣·梅兰可莉",
            "medixin_prefix": "东方",
            reisen: "铃仙·优昙华院·因幡",
            "reisen_prefix": "东方",
            "东方乱斗谈": "东方乱斗谈",
        },
        connect: true,
    },
    card: {
        card: {
            "bagua_furnace": {
                type: "equip",
                subtype: "equip5",
                enable: true,
                skills: ["mini_bagua_furnace","magic_collection"],
                ai: {
                    basic: {
                        equipValue: 7,
                        order: 9,
                        useful: 2,
                        value: (card, player, index, method) => {
                            if (!player.getCards("e").includes(card) && !player.canEquip(card, true)) {
                                return 0.01;
                            }
                            const info = get.info(card),
                                current = player.getEquip(info.subtype),
                                value = current && card != current && get.value(current, player);
                            let equipValue = info.ai.equipValue || info.ai.basic.equipValue;
                            if (typeof equipValue == "function") {
                                if (method == "raw") {
                                    return equipValue(card, player);
                                }
                                if (method == "raw2") {
                                    return equipValue(card, player) - value;
                                }
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != "number") {
                                equipValue = 0;
                            }
                            if (method == "raw") {
                                return equipValue;
                            }
                            if (method == "raw2") {
                                return equipValue - value;
                            }
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: (player, target, card) => get.equipResult(player, target, card),
                    },
                },
                selectTarget: -1,
                filterTarget: (card, player, target) => player == target && target.canEquip(card, true),
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (
                        !card?.cards.some(card => {
                            return get.position(card, true) !== "o";
                        })
                    ) {
                        target.equip(card);
                    }
                    //if (cards.length && get.position(cards[0], true) == "o") target.equip(cards[0]);
                },
                toself: true,
            },
            "penglai_puppet": {
                type: "equip",
                subtype: "equip5",
                enable: true,
                skills: ["puppet_guard","puppet_performance"],
                ai: {
                    basic: {
                        equipValue: 6,
                        order: 9,
                        useful: 2,
                        value: (card, player, index, method) => {
                            if (!player.getCards("e").includes(card) && !player.canEquip(card, true)) {
                                return 0.01;
                            }
                            const info = get.info(card),
                                current = player.getEquip(info.subtype),
                                value = current && card != current && get.value(current, player);
                            let equipValue = info.ai.equipValue || info.ai.basic.equipValue;
                            if (typeof equipValue == "function") {
                                if (method == "raw") {
                                    return equipValue(card, player);
                                }
                                if (method == "raw2") {
                                    return equipValue(card, player) - value;
                                }
                                return Math.max(0.1, equipValue(card, player) - value);
                            }
                            if (typeof equipValue != "number") {
                                equipValue = 0;
                            }
                            if (method == "raw") {
                                return equipValue;
                            }
                            if (method == "raw2") {
                                return equipValue - value;
                            }
                            return Math.max(0.1, equipValue - value);
                        },
                    },
                    result: {
                        target: (player, target, card) => get.equipResult(player, target, card),
                    },
                },
                selectTarget: -1,
                filterTarget: (card, player, target) => player == target && target.canEquip(card, true),
                modTarget: true,
                allowMultiple: false,
                content: function () {
                    if (
                        !card?.cards.some(card => {
                            return get.position(card, true) !== "o";
                        })
                    ) {
                        target.equip(card);
                    }
                    //if (cards.length && get.position(cards[0], true) == "o") target.equip(cards[0]);
                },
                toself: true,
            },
        },
        translate: {
            "bagua_furnace": "八卦炉",
            "bagua_furnace_info": "装备牌-宝物<br><b>迷你八卦炉</b>：当你使用【杀】指定目标后，你可以弃置一张手牌，令此【杀】不可被【闪】响应，且伤害+1。<br><b>魔力收集</b>：每当你造成1点伤害后，你可以摸一张牌（每回合限一次）。",
            "penglai_puppet": "蓬莱人偶",
            "penglai_puppet_info": "装备牌-宝物<br><b>守护</b>：当你成为【杀】或【决斗】的目标时，你可以弃置一张手牌，视为使用一张【闪】或打出一张【杀】。<br><b>人偶操演</b>：出牌阶段限一次，你可以将一张手牌当作【杀】对与你距离为1的角色使用。若如此做，此【杀】结算后，你摸一张牌。",
            "东方乱斗谈": "东方乱斗谈",
        },
        list: [],
        connect: true,
    },
    skill: {
        skill: {
            renoucaoyan: {
                audio: "ext:东方乱斗谈:2",
                trigger: {
                    global: "gameStart",
                    player: "phaseDrawBegin",
                },
                forced: true,
                init: function(player) {
                    if (!player.storage.renou) {
                        player.storage.renou = 0;
                    }
                },
                async content(event, trigger, player) {
                    if (trigger.name == "gameStart" || event.triggername == "gameStart") {
                        player.storage.renou = 3;
                        player.markSkill("renoucaoyan");
                        game.log(player, "获得了3个人偶标记");
                    } else if (trigger.name == "phaseDrawBegin" || event.triggername == "phaseDrawBegin") {
                        let num = Math.floor(player.storage.renou / 2);
                        if (num > 0) {
                            trigger.num += num;
                            game.log(player, "额外摸了", num, "张牌");
                        }
                    }
                },
                intro: {
                    name: "人偶师",
                    content: function(storage, player) {
                        return "当前人偶标记数：" + (player.storage.renou || 0) + "（最多7个）";
                    },
                },
                marktext: "偶",
                group: ["renoucaoyan_use"],
                subSkill: {
                    use: {
                        enable: "chooseToUse",
                        filter: function(event, player) {
                            if (!player.storage.renou || player.storage.renou < 1) return false;
                            if (event.filterCard({name: "shan"}, player, event) && player.storage.renou >= 1) return true;
                            if (event.filterCard({name: "sha"}, player, event) && player.storage.renou >= 2) return true;
                            if (event.filterCard({name: "wuxie"}, player, event) && player.storage.renou >= 3) return true;
                            return false;
                        },
                        chooseButton: {
                            dialog: function(event, player) {
                                let list = [];
                                if (event.filterCard({name: "shan"}, player, event) && player.storage.renou >= 1) {
                                    list.push(["基本", "", "shan"]);
                                }
                                if (event.filterCard({name: "sha"}, player, event) && player.storage.renou >= 2) {
                                    list.push(["基本", "", "sha"]);
                                }
                                if (event.filterCard({name: "wuxie"}, player, event) && player.storage.renou >= 3) {
                                    list.push(["锦囊", "", "wuxie"]);
                                }
                                return ui.create.dialog("人偶操演", [list, "vcard"]);
                            },
                            filter: function(button, player) {
                                let name = button.link[2];
                                if (name == "shan") return player.storage.renou >= 1;
                                if (name == "sha") return player.storage.renou >= 2;
                                if (name == "wuxie") return player.storage.renou >= 3;
                                return false;
                            },
                            check: function(button) {
                                return 1;
                            },
                            backup: function(links, player) {
                                let name = links[0][2];
                                let cost = name == "shan" ? 1 : (name == "sha" ? 2 : 3);
                                return {
                                    filterCard: function() { return false; },
                                    selectCard: -1,
                                    viewAs: {name: name},
                                    precontent: async function() {
                                        player.storage.renou -= cost;
                                        player.syncStorage("renou");
                                        player.updateMarks("renoucaoyan");
                                        game.log(player, "消耗了", cost, "个人偶标记");
                                    }
                                };
                            },
                            prompt: function(links, player) {
                                let name = links[0][2];
                                let cost = name == "shan" ? 1 : (name == "sha" ? 2 : 3);
                                return "消耗" + cost + "个人偶标记，视为使用【" + get.translation(name) + "】";
                            },
                        },
                        ai: {
                            order: function() {
                                return 10;
                            },
                            result: {
                                player: 1,
                            },
                        },
                        sub: true,
                        sourceSkill: "renoucaoyan",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            mofu: {
                audio: "ext:东方乱斗谈:2",
                enable: "phaseUse",
                usedTimes: 1,
                filter: function(event, player) {
                    // 法兰西人偶不需要弃牌，只需要有人偶标记和守护人偶角色
                    var hasFalanxi = !player.storage.mofu_falanxi && player.storage.renou > 0 && game.hasPlayer(function(current) {
                        return current.storage.shouhu_renou;
                    });
                    // 其他选项需要弃牌
                    var hasOthers = player.countCards("he") > 0 && (!player.storage.mofu_shanghai || !player.storage.mofu_penglai);
                    return hasFalanxi || hasOthers;
                },
                group: ["mofu_clear","mofu_falanxi_direct"],
                chooseButton: {
                    dialog: function(event, player) {
                        var list = [];
                        // 上海人偶和蓬莱人偶需要弃牌
                        if (!player.storage.mofu_shanghai && player.countCards("he") > 0) list.push(["上海人偶", "shanghai", "获得一个人偶标记，可选择将一张守护人偶置于其他角色武将牌旁"]);
                        if (!player.storage.mofu_penglai && player.countCards("he") > 0) list.push(["蓬莱人偶", "penglai", "本回合可将手牌当作基本牌或非延时锦囊牌使用，若弃置装备牌则额外获得人偶标记"]);
                        // 法兰西人偶不需要弃牌，只需要人偶标记和守护人偶角色
                        if (!player.storage.mofu_falanxi && player.storage.renou > 0 && game.hasPlayer(function(current) {
                            return current.storage.shouhu_renou;
                        })) list.push(["法兰西人偶", "falanxi", "消耗一个人偶标记，令有守护人偶的角色进入一个额外的出牌阶段"]);
                        if (list.length == 0) return;
                        var dialog = ui.create.dialog("魔符", "hidden");
                        dialog.add([list.map(function(item) {
                            return [item[1], item[2], item[0]];
                        }), "tdnodes"]);
                        return dialog;
                    },
                    check: function(button) {
                        var player = _status.event.player;
                        switch(button.link) {
                            case "shanghai":
                                return 7;
                            case "penglai":
                                return player.countCards("h", {type: "equip"}) > 0 ? 8 : 6;
                            case "falanxi":
                                return game.hasPlayer(function(current) {
                                    return current.storage.shouhu_renou;
                                }) ? 9 : 4;
                        }
                        return 5;
                    },
                    backup: function(links) {
                        // 法兰西人偶不需要弃牌
                        if (links[0] == "falanxi") {
                            return {
                                filterCard: false,
                                selectCard: 0,
                                async content(event, trigger, player) {
                                    player.storage.mofu_falanxi = true;
                                    
                                    let targetResult = await player.chooseTarget("选择一名有守护人偶的角色", true, function(card, player, target) {
                                        return target.storage.shouhu_renou;
                                    }).set("ai", function(target) {
                                        return get.attitude(player, target) + target.countCards("h");
                                    }).forResult();
                                    
                                    if (targetResult.bool && targetResult.targets && targetResult.targets[0]) {
                                        player.storage.renou--;
                                        player.updateMarks("renoucaoyan");
                                        game.log(player, "移除了1个人偶标记");
                                        var target = targetResult.targets[0];
                                        target.storage.falanxi_extra = player;
                                        await target.phase("phaseUse");
                                        delete target.storage.falanxi_extra;
                                    }
                                },
                                ai: {
                                    order: 8,
                                    result: {
                                        player: 1
                                    }
                                }
                            };
                        }
                        
                        // 其他选项需要弃牌
                        return {
                            filterCard: true,
                            selectCard: 1,
                            position: "he",
                            check: function(card) {
                                if (links[0] == "penglai" && get.type(card) == "equip") return 10;
                                return 7 - get.value(card);
                            },
                            async content(event, trigger, player) {
                                var choice = links[0];
                                player.storage["mofu_" + choice] = true;
                                player.syncStorage("mofu_" + choice);
                                
                                if (choice == "shanghai") {
                                    player.storage.renou = Math.min((player.storage.renou || 0) + 2, 7);
                                    player.syncStorage("renou");
                                    player.updateMarks("renoucaoyan");
                                    game.log(player, "获得了2个人偶标记");
                                    
                                    if (game.hasPlayer(function(current) {
                                        return current != player;
                                    })) {
                                        let result = await player.chooseTarget("是否将一个人偶标记置于一名其他角色的武将牌旁？", function(card, player, target) {
                                            return target != player;
                                        }).set("ai", function(target) {
                                            return get.attitude(player, target);
                                        }).forResult();
                                        
                                        if (result.bool && result.targets && result.targets[0]) {
                                            var target = result.targets[0];
                                            target.storage.shouhu_renou = true;
                                            target.syncStorage("shouhu_renou");
                                            target.markSkill("shouhu_renou");
                                            game.log(player, "将一个守护人偶置于", target, "的武将牌旁");
                                        }
                                    }
                                } else if (choice == "penglai") {
                                    let cardResult = await player.chooseCard("h", "选择一张手牌当作任意基本牌或非延时锦囊牌使用", true).set("ai", function(card) {
                                        return get.type(card) == "equip" ? 10 : 5;
                                    }).forResult();
                                    
                                    if (cardResult.bool && cardResult.cards && cardResult.cards[0]) {
                                        var card = cardResult.cards[0];
                                        var list = [];
                                        for (var name of lib.inpile) {
                                            var type = get.type(name);
                                            if ((type == "basic" || type == "trick") && player.hasUseTarget({name: name})) {
                                                list.push([type, "", name]);
                                            }
                                        }
                                        
                                        let buttonResult = await player.chooseButton(["蓬莱人偶：选择要使用的牌", [list, "vcard"]], true).set("ai", function(button) {
                                            return player.getUseValue({name: button.link[2]});
                                        }).forResult();
                                        
                                        if (buttonResult.bool) {
                                            var cardName = buttonResult.links[0][2];
                                            // 创建虚拟卡牌，将原卡牌转换为目标卡牌
                                            var fakeCard = {
                                                name: cardName,
                                                isCard: true,
                                                cards: [card],
                                                _cardid: card.cardid
                                            };
                                            
                                            // 选择目标
                                            let targetResult = await player.chooseTarget('选择目标', function(card, player, target) {
                                                return player.canUse(fakeCard, target);
                                            }).forResult();
                                            
                                            if (targetResult.bool) {
                                                await player.useCard(fakeCard, targetResult.targets);
                                                if (get.type(card) == "equip") {
                                                    player.storage.renou = Math.min((player.storage.renou || 0) + 1, 7);
                                                    player.syncStorage("renou");
                                                    player.updateMarks("renoucaoyan");
                                                    game.log(player, "获得了1个人偶标记");
                                                }
                                            }
                                        }
                                    }
                                }
                                // 法兰西人偶选项已在backup函数开头处理，这里不需要重复处理
                                
                                // 回合限制标记在回合结束时清除
                            },
                            ai: {
                                order: 8,
                                result: {
                                    player: 1
                                }
                            }
                        };
                    },
                },
                ai: {
                    order: 8,
                    result: {
                        player: 1,
                    },
                },
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseJieshuBegin",
                        },
                        forced: true,
                        popup: false,
                        async content(event, trigger, player) {
                            delete player.storage.mofu_shanghai;
                            delete player.storage.mofu_penglai;
                            delete player.storage.mofu_falanxi;
                        },
                        sub: true,
                        sourceSkill: "mofu",
                        "_priority": 0,
                    },
                    "falanxi_direct": {
                        enable: "phaseUse",
                        filter: function(event, player) {
                            return !player.storage.mofu_falanxi && player.storage.renou > 0 && game.hasPlayer(function(current) {
                                return current.storage.shouhu_renou;
                            });
                        },
                        async content(event, trigger, player) {
                            player.storage.mofu_falanxi = true;
                            
                            let targetResult = await player.chooseTarget("选择一名有守护人偶的角色", true, function(card, player, target) {
                                return target.storage.shouhu_renou;
                            }).set("ai", function(target) {
                                return get.attitude(player, target) + target.countCards("h");
                            }).forResult();
                            
                            if (targetResult.bool && targetResult.targets && targetResult.targets[0]) {
                                player.storage.renou--;
                                player.updateMarks("renoucaoyan");
                                game.log(player, "移除了1个人偶标记");
                                var target = targetResult.targets[0];
                                target.storage.falanxi_extra = player;
                                await target.phase("phaseUse");
                                delete target.storage.falanxi_extra;
                            }
                        },
                        ai: {
                            order: 8,
                            result: {
                                player: 1,
                            },
                        },
                        sub: true,
                        sourceSkill: "mofu",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            "shouhu_renou": {
                mark: true,
                intro: {
                    name: "守护人偶",
                    content: "拥有守护人偶",
                },
                marktext: "守",
                "_priority": 0,
            },
            qise: {
                audio: "ext:东方乱斗谈:2",
                trigger: {
                    global: ["useCardToTargeted","phaseDrawBegin","phaseEnd"],
                },
                group: ["qise_equip"],
                filter: function(event, player) {
                    if (event.name == "useCardToTargeted") {
                        return event.target && event.target.storage.shouhu_renou && 
                               event.player != player && event.targets && event.targets.includes(event.target);
                    }
                    if (event.name == "phaseDrawBegin") {
                        return event.player.storage.shouhu_renou;
                    }
                    if (event.name == "phaseEnd") {
                        return event.player == player && game.countPlayer(function(current) {
                            return current.storage.shouhu_renou;
                        }) >= 2;
                    }
                    return false;
                },
                async content(event, trigger, player) {
                    if (trigger.name == "useCardToTargeted") {
                        let result = await player.chooseBool("是否移除" + get.translation(trigger.target) + "的守护人偶，取消此目标？").set("ai", function() {
                            var att = get.attitude(player, trigger.target);
                            var eff = get.effect(trigger.target, trigger.card, trigger.player, player);
                            return att > 0 && eff < 0;
                        }).forResult();
                        
                        if (result.bool) {
                            trigger.target.storage.shouhu_renou = false;
                            trigger.target.syncStorage("shouhu_renou");
                            trigger.target.unmarkSkill("shouhu_renou");
                            trigger.targets.remove(trigger.target);
                            trigger.getParent().triggeredTargets2.remove(trigger.target);
                            game.log(player, "移除了", trigger.target, "的守护人偶，取消了此目标");
                        }
                    } else if (trigger.name == "phaseDrawBegin") {
                        trigger.num++;
                        game.log(trigger.player, "因守护人偶效果，额外摸一张牌");
                    } else if (trigger.name == "phaseEnd") {
                        player.storage.renou = Math.min((player.storage.renou || 0) + 1, 7);
                        player.syncStorage("renou");
                        player.updateMarks("renoucaoyan");
                        game.log(player, "获得了1个人偶标记");
                    }
                },
                ai: {
                    threaten: 1.5,
                },
                subSkill: {
                    equip: {
                        trigger: {
                            player: "useCard",
                        },
                        forced: true,
                        popup: false,
                        filter: function(event, player) {
                            return get.type(event.card) == "equip" && event.card.name && 
                                   event.getParent().skill && event.getParent().skill.indexOf("renoucaoyan") == 0;
                        },
                        content: function() {
                            // 装备牌使用时不移除人偶标记，恢复消耗的标记
                            var cost = 0;
                            if (trigger.getParent().skill == "renoucaoyan_use_backup") {
                                // 根据使用的牌类型确定消耗
                                var name = trigger.card.name;
                                if (name == "shan") cost = 1;
                                else if (name == "sha") cost = 2;
                                else if (name == "wuxie") cost = 3;
                                
                                if (cost > 0) {
                                    player.storage.renou = Math.min((player.storage.renou || 0) + cost, 7);
                                    player.updateMarks("renoucaoyan");
                                    game.log(player, "因七色技能，装备牌不消耗人偶标记，恢复了", cost, "个人偶标记");
                                }
                            }
                        },
                        sub: true,
                        sourceSkill: "qise",
                        "_priority": 0,
                    },
                },
                "_priority": 0,
            },
            huantong: {
                audio: "ext:东方乱斗谈:2",
                trigger: {
                    player: ["phaseDrawBegin","phaseZhunbeiBegin"],
                },
                filter(event, player) {
                    if (event.name == 'phaseDraw') return true;
                    if (event.name == 'phaseZhunbei') return game.hasPlayer(target => target != player);
                    return false;
                },
                async content(event, trigger, player) {
                    if (trigger.name == 'phaseDraw') {
                        // 摸牌阶段，摸牌数变为3张
                        trigger.num = 3;
                    } else if (trigger.name == 'phaseZhunbei') {
                        // 准备阶段，选择一名其他角色，视为对其使用过河拆桥
                        let targets = await player.chooseTarget('选择一名角色，视为对其使用【过河拆桥】', true, (card, player, target) => {
                            return target != player;
                        }).forResultTargets();
                        
                        if (targets && targets.length > 0) {
                            await player.useCard({name: 'guohe'}, targets[0]);
                        }
                    }
                },
                ai: {
                    threaten: 1.5,
                },
                "_priority": 0,
            },
            renoushi: {
                audio: "ext:东方project/renoushi.mp3",
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                unique: true,
                forced: true,
                skillAnimation: true,
                animationColor: "thunder",
                juexingji: true,
                filter: function(event, player) {
                    return player.storage.renou >= 7;
                },
                async content(event, trigger, player) {
                    player.awakenSkill("renoushi");
                    await player.loseMaxHp();
                    await player.recover();
                    player.addSkillLog("qianxian");
                    player.addSkillLog("juchang");
                },
                derivation: ["qianxian","juchang"],
                "_priority": 0,
            },
            qianxian: {
                audio: "ext:东方project/qianxian.mp3",
                mod: {
                    selectTarget: function(card, player, range) {
                        if (range[1] == -1) return;
                        var num = player.storage.renou - 4;
                        if (num > 0) {
                            range[1] += num;
                        }
                    },
                },
                enable: "phaseUse",
                filter: function(event, player) {
                    return player.storage.renou > 0;
                },
                chooseButton: {
                    dialog: function(event, player) {
                        var list = [];
                        for (var i of lib.inpile) {
                            var type = get.type(i);
                            if (type == "basic") {
                                list.push([type, "", i]);
                            }
                        }
                        return ui.create.dialog("千线", [list, "vcard"], "hidden");
                    },
                    check: function(button) {
                        var player = _status.event.player;
                        return player.getUseValue({name: button.link[2]}) + 1;
                    },
                    backup: function(links, player) {
                        return {
                            filterCard: function() {return false},
                            selectCard: -1,
                            popname: true,
                            viewAs: {name: links[0][2]},
                            precontent: function() {
                                player.storage.renou--;
                                player.updateMarks("renoucaoyan");
                                game.log(player, "消耗了1个人偶标记");
                            }
                        }
                    },
                    prompt: function(links, player) {
                        return "消耗1个人偶标记，视为使用" + get.translation(links[0][2]);
                    },
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            juchang: {
                audio: "ext:东方project/juchang.mp3",
                enable: "phaseUse",
                usable: 1,
                filter: function(event, player) {
                    return game.countPlayer(function(current) {
                        return current.storage.shouhu_renou;
                    }) > 0;
                },
                content: function() {
                    "step 0"
                    player.chooseTarget("选择这些角色使用【杀】的目标", true, function(card, player, target) {
                        return player != target;
                    }).set("ai", function(target) {
                        return -get.attitude(player, target);
                    });
                    "step 1"
                    if (result.bool) {
                        event.target = result.targets[0];
                        event.puppets = game.filterPlayer(function(current) {
                            return current.storage.shouhu_renou;
                        });
                        event.count = 0;
                    } else {
                        event.finish();
                    }
                    "step 2"
                    if (event.count < event.puppets.length) {
                        var puppet = event.puppets[event.count];
                        puppet.storage.shouhu_renou = false;
                        puppet.syncStorage("shouhu_renou");
                        puppet.unmarkSkill("shouhu_renou");
                        puppet.useCard({name: "sha", isCard: true}, event.target, false);
                        event.count++;
                        event.redo();
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        player: function(player) {
                            if (game.countPlayer(function(current) {
                                return current.storage.shouhu_renou && get.attitude(player, current) > 0;
                            }) < 2) return 0;
                            return 1;
                        },
                    },
                },
                "_priority": 0,
            },
            "juchang_damage": {
                audio: "ext:东方乱斗谈:0",
                trigger: {
                    global: "damageBegin4",
                },
                forced: true,
                filter: function(event, player) {
                    return player.hasSkill("juchang") && event.player.storage.shouhu_renou && player.storage.renou > 0;
                },
                content: function() {
                    "step 0"
                    player.chooseBool("是否消耗1个人偶标记，防止" + get.translation(trigger.player) + "受到的伤害？").set("ai", function() {
                        return get.attitude(player, trigger.player) > 0;
                    });
                    "step 1"
                    if (result.bool) {
                        player.storage.renou--;
                        player.updateMarks("renoucaoyan");
                        trigger.cancel();
                        game.log(player, "消耗了1个人偶标记，防止了", trigger.player, "受到的伤害");
                    }
                },
                "_priority": 0,
            },
            jiezou: {
                audio: "ext:东方乱斗谈:2",
                enable: "phaseUse",
                usable: 1,
                filterTarget(card, player, target) {
                    return target != player;
                },
                async content(event, trigger, player) {
                    let target = event.target;
                    
                    // 选择借走模式
                    let choices = [];
                    let choiceList = [];
                    
                    if (target.countCards('h') > 0) {
                        choices.push('option1');
                        choiceList.push('获得其一张手牌，然后交给其一张牌');
                    }
                    if (target.countCards('e') > 0) {
                        choices.push('option2');
                        choiceList.push('获得其装备区一张牌，其摸两张牌');
                    }
                    if (target.countCards('h') > 0) {
                        choices.push('option3');
                        choiceList.push('观看其手牌，然后可以交换等量手牌');
                    }
                    
                    if (choices.length == 0) return;
                    
                    let result = await player.chooseControl(choices).set('choiceList', choiceList).set('prompt', '借走：选择一项').forResult();
                    
                    if (result.control == 'option1') {
                        // 获得手牌并交换
                        let cards = await player.gainPlayerCard(target, 'h', true).forResultCards();
                        if (cards && cards.length > 0 && player.countCards('he') > 0) {
                            let give = await player.chooseCard('he', '选择一张牌交给' + get.translation(target), true).forResultCards();
                            if (give && give.length > 0) {
                                await player.give(give, target);
                            }
                        }
                    } else if (result.control == 'option2') {
                        // 获得装备牌
                        let cards = await player.gainPlayerCard(target, 'e', true).forResultCards();
                        if (cards && cards.length > 0) {
                            await target.draw(2);
                            // 装备牌可以立即使用
                            for (let card of cards) {
                                if (get.type(card) == 'equip' && player.canUse(card, player)) {
                                    let useResult = await player.chooseToUse(card, '是否立即使用' + get.translation(card) + '？').forResult();
                                }
                            }
                        }
                    } else if (result.control == 'option3') {
                        // 观看手牌并交换
                        let targetCards = target.getCards('h');
                        await player.viewCards('借走', targetCards);
                        
                        if (player.countCards('h') > 0) {
                            let num = Math.min(player.countCards('h'), targetCards.length);
                            let exchange = await player.chooseCard('h', [0, num], '选择要交换的手牌（最多' + num + '张）').forResult();
                            
                            if (exchange.bool && exchange.cards.length > 0) {
                                // 由玩家选择要拿走目标的哪些手牌
                                let targetGive = await player.chooseCardButton(
                                    targetCards,
                                    exchange.cards.length,
                                    '选择要拿走' + get.translation(target) + '的' + exchange.cards.length + '张手牌'
                                ).set('forced', true).forResultLinks();
                                
                                if (targetGive && targetGive.length > 0) {
                                    // 交换手牌
                                    await player.gain(targetGive, target, 'giveAuto');
                                    await target.gain(exchange.cards, player, 'giveAuto');
                                }
                            }
                        }
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        target: -1,
                    },
                },
                "_priority": 0,
            },
            mopao: {
                audio: "ext:东方乱斗谈:2",
                forced: true,
                mod: {
                    cardUsable(card, player, num) {
                         if (card.name == 'sha') return num + 1;
                     },
                    attackRange(player, num) {
                         return num + 2;
                     },
                    selectTarget(card, player, range) {
                        if (card.name == 'sha') {
                            range[0] = 1;  // 最小目标数保持为1
                            range[1] = Infinity;  // 最大目标数设为无限
                        }
                    },
                },
                trigger: {
                    player: "useCard",
                },
                filter(event, player) {
                     return event.card.name == 'sha' && event.targets && event.targets.length > 1;
                 },
                async content(event, trigger, player) {
                     let num = trigger.targets.length - 1;
                     if (num > 0 && player.countCards('he') >= num) {
                         let result = await player.chooseToDiscard('he', num, '魔炮：是否弃置' + num + '张牌，令此【杀】造成的伤害+1？').forResult();
                         if (result.bool) {
                             trigger.baseDamage = (trigger.baseDamage || 1) + 1;
                             player.logSkill('mopao');
                         }
                     }
                 },
                ai: {
                    threaten: 2,
                },
                "_priority": 0,
            },
            xingxie: {
                audio: "ext:东方乱斗谈:2",
                trigger: {
                    player: "phaseDrawBegin",
                },
                filter(event, player) {
                     return !event.numFixed;
                 },
                async content(event, trigger, player) {
                    let result = await player.chooseBool('星屑：是否改为亮出牌堆顶5张牌，获得其中的锦囊牌和装备牌？').forResult();
                    if (result.bool) {
                        trigger.changeToZero = true;
                        let cards = get.cards(5);
                        player.logSkill('xingxie');
                        
                        // 展示牌
                        await player.showCards(cards);
                        
                        // 获得锦囊牌和装备牌
                        let toGain = cards.filter(card => {
                            return get.type(card) == 'trick' || get.type(card) == 'equip';
                        });
                        
                        // 其余牌进入弃牌堆
                        let toDiscard = cards.filter(card => {
                            return !toGain.includes(card);
                        });
                        
                        if (toGain.length > 0) {
                            await player.gain(toGain, 'draw');
                        }
                        
                        if (toDiscard.length > 0) {
                            // 直接调用 cardsGotoOrdering，它会处理弃牌逻辑
                            game.cardsGotoOrdering(toDiscard);
                        }
                    }
                },
                mod: {
                    cardUsable(card, player, num) {
                         if (get.type(card) == 'trick') return Infinity;
                     },
                    selectTarget(card, player, range) {
                         if (get.type(card) == 'trick' && range[1] != -1) {
                             range[1]++;
                         }
                     },
                },
                "trigger2": {
                    source: "damageBegin1",
                },
                filter2(event, player) {
                     return player.countCards('e') >= 3;
                 },
                async content2(event, trigger, player) {
                     trigger.num++;
                     player.logSkill('xingxie');
                 },
                ai: {
                    threaten: 1.5,
                },
                "_priority": 0,
            },
            mofa: {
                audio: "ext:东方乱斗谈:2",
                skillAnimation: true,
                animationColor: "thunder",
                unique: true,
                limited: true,
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                filter(event, player) {
                     if (player.storage.mofa) return false;
                     return player.getHistory('useCard', function(evt) {
                         return get.type(evt.card) == 'trick';
                     }).length >= 8;
                 },
                async content(event, trigger, player) {
                     player.storage.mofa = true;
                     player.syncStorage('mofa');
                     player.awakenSkill('mofa');
                     player.loseMaxHp();
                     player.recover(player.maxHp - player.hp);
                     player.addSkillLog('jiguang');
                     player.addSkillLog('toushi');
                 },
                derivation: ["jiguang","toushi"],
                mark: true,
                intro: {
                    content: "limited",
                },
                init: (player, skill) => (player.storage[skill] = false),
                "_priority": 0,
            },
            jiguang: {
                audio: "ext:东方乱斗谈:2",
                enable: "chooseToUse",
                filterCard: true,
                selectCard: [1,Infinity],
                viewAs: {
                    name: "wanjian",
                },
                position: "hs",
                viewAsFilter(player) {
                     return player.countCards('hs') > 0;
                 },
                prompt: "将任意张手牌当作【万箭齐发】使用",
                check(card) {
                     return 6 - get.value(card);
                 },
                trigger: {
                    player: "useCard",
                },
                filter(event, player) {
                     return get.type(event.card) == 'trick' && (event.card.name == 'wanjian' || event.card.name == 'nanman');
                 },
                forced: true,
                async content(event, trigger, player) {
                     let evt = trigger.getParent();
                     if (evt && evt.name == 'useCard') {
                         evt.effectCount = (evt.effectCount || 1) + 1;
                     }
                 },
                "trigger2": {
                    player: "useCard",
                },
                filter2(event, player) {
                     return get.type(event.card) == 'trick';
                 },
                async content2(event, trigger, player) {
                     player.draw();
                 },
                ai: {
                    order: 1,
                    result: {
                        target: function(player, target) {
                             if (target.countCards('shan') == 0) return -1.5;
                             return -0.5;
                         },
                        player(player, target) {
                            if (player._wanjian_temp || player.hasSkillTag("jueqing", false, target)) {
                                return 0;
                            }
                            if (target.hp > 2 || (target.hp > 1 && !target.isZhu && target !== game.boss && target !== game.trueZhu && target !== game.falseZhu)) {
                                return 0;
                            }
                            player._wanjian_temp = true;
                            let eff = get.effect(target, new lib.element.VCard({ name: "wanjian" }), player, target);
                            delete player._wanjian_temp;
                            if (eff >= 0) {
                                return 0;
                            }
                            if (target.hp > 1 && target.hasSkillTag("respondShan", true, "respond", true)) {
                                return 0;
                            }
                            let known = target.getKnownCards(player);
                            if (
                                known.some(card => {
                                    let name = get.name(card, target);
                                    if (name === "shan" || name === "hufu") {
                                        return lib.filter.cardRespondable(card, target);
                                    }
                                    if (name === "wuxie") {
                                        return lib.filter.cardEnabled(card, target, "forceEnable");
                                    }
                                })
                            ) {
                                return 0;
                            }
                            if (target.hp > 1 || target.countCards("hs", i => !known.includes(i)) > 3.67 - (2 * target.hp) / target.maxHp) {
                                return 0;
                            }
                            let res = 0,
                                att = get.sgnAttitude(player, target);
                            res -= att * (0.8 * target.countCards("hs") + 0.6 * target.countCards("e") + 3.6);
                            if (get.mode() === "identity" && target.identity === "fan") {
                                res += 2.4;
                            }
                            if ((get.mode() === "guozhan" && player.identity !== "ye" && player.identity === target.identity) || (get.mode() === "identity" && player.identity === "zhu" && (target.identity === "zhong" || target.identity === "mingzhong"))) {
                                res -= 0.8 * player.countCards("he");
                            }
                            return res;
                        },
                    },
                    wuxie(target, card, player, viewer, status) {
                        let att = get.attitude(viewer, target),
                            eff = get.effect(target, card, player, target);
                        if (Math.abs(att) < 1 || status * eff * att >= 0) {
                            return 0;
                        }
                        let evt = _status.event.getParent("useCard"),
                            pri = 1,
                            bonus = player.hasSkillTag("damageBonus", true, {
                                target: target,
                                card: card,
                            }),
                            damage = 1,
                            isZhu = function (tar) {
                                return tar.isZhu || tar === game.boss || tar === game.trueZhu || tar === game.falseZhu;
                            },
                            canShan = function (tar, blur) {
                                let known = tar.getKnownCards(viewer);
                                if (!blur) {
                                    return known.some(card => {
                                        let name = get.name(card, tar);
                                        return (name === "shan" || name === "hufu") && lib.filter.cardRespondable(card, tar);
                                    });
                                }
                                if (tar.countCards("hs", i => !known.includes(i)) > 3.67 - (2 * tar.hp) / tar.maxHp) {
                                    return true;
                                }
                                if (!tar.hasSkillTag("respondShan", true, "respond", true)) {
                                    return false;
                                }
                                if (tar.hp <= damage) {
                                    return false;
                                }
                                if (tar.hp <= damage + 1) {
                                    return isZhu(tar);
                                }
                                return true;
                            },
                            self = false;
                        if (canShan(target)) {
                            return 0;
                        }
                        if (
                            bonus &&
                            !viewer.hasSkillTag("filterDamage", null, {
                                player: player,
                                card: card,
                            })
                        ) {
                            damage = 2;
                        }
                        if ((viewer.hp <= damage || (viewer.hp <= damage + 1 && isZhu(viewer))) && !canShan(viewer)) {
                            if (viewer === target) {
                                return status;
                            }
                            let fv = true;
                            if (evt && evt.targets) {
                                for (let i of evt.targets) {
                                    if (fv) {
                                        if (target === i) {
                                            fv = false;
                                        }
                                        continue;
                                    }
                                    if (viewer === i) {
                                        if (isZhu(viewer)) {
                                            return 0;
                                        }
                                        self = true;
                                        break;
                                    }
                                }
                            }
                        }
                        let mayShan = canShan(target, true);
                        if (
                            bonus &&
                            !target.hasSkillTag("filterDamage", null, {
                                player: player,
                                card: card,
                            })
                        ) {
                            damage = 2;
                        } else {
                            damage = 1;
                        }
                        if (isZhu(target)) {
                            if (eff < 0) {
                                if (target.hp <= damage + 1 || (!mayShan && target.hp <= damage + 2)) {
                                    return 1;
                                }
                                if (mayShan && target.hp > damage + 2) {
                                    return 0;
                                } else if (mayShan || target.hp > damage + 2) {
                                    pri = 3;
                                } else {
                                    pri = 4;
                                }
                            } else if (target.hp > damage + 1) {
                                pri = 2;
                            } else {
                                return 0;
                            }
                        } else if (self) {
                            return 0;
                        } else if (eff < 0) {
                            if (!mayShan && target.hp <= damage) {
                                pri = 5;
                            } else if (mayShan) {
                                return 0;
                            } else if (target.hp > damage + 1) {
                                pri = 2;
                            } else if (target.hp === damage + 1) {
                                pri = 3;
                            } else {
                                pri = 4;
                            }
                        } else if (target.hp <= damage) {
                            return 0;
                        }
                        let find = false;
                        if (evt && evt.targets) {
                            for (let i = 0; i < evt.targets.length; i++) {
                                if (!find) {
                                    if (evt.targets[i] === target) {
                                        find = true;
                                    }
                                    continue;
                                }
                                let att1 = get.attitude(viewer, evt.targets[i]),
                                    eff1 = get.effect(evt.targets[i], card, player, evt.targets[i]),
                                    temp = 1;
                                if (Math.abs(att1) < 1 || att1 * eff1 >= 0 || canShan(evt.targets[i])) {
                                    continue;
                                }
                                mayShan = canShan(evt.targets[i], true);
                                if (
                                    bonus &&
                                    !evt.targets[i].hasSkillTag("filterDamage", null, {
                                        player: player,
                                        card: card,
                                    })
                                ) {
                                    damage = 2;
                                } else {
                                    damage = 1;
                                }
                                if (isZhu(evt.targets[i])) {
                                    if (eff1 < 0) {
                                        if (evt.targets[i].hp <= damage + 1 || (!mayShan && evt.targets[i].hp <= damage + 2)) {
                                            return 0;
                                        }
                                        if (mayShan && evt.targets[i].hp > damage + 2) {
                                            continue;
                                        }
                                        if (mayShan || evt.targets[i].hp > damage + 2) {
                                            temp = 3;
                                        } else {
                                            temp = 4;
                                        }
                                    } else if (evt.targets[i].hp > damage + 1) {
                                        temp = 2;
                                    } else {
                                        continue;
                                    }
                                } else if (eff1 < 0) {
                                    if (!mayShan && evt.targets[i].hp <= damage) {
                                        temp = 5;
                                    } else if (mayShan) {
                                        continue;
                                    } else if (evt.targets[i].hp > damage + 1) {
                                        temp = 2;
                                    } else if (evt.targets[i].hp === damage + 1) {
                                        temp = 3;
                                    } else {
                                        temp = 4;
                                    }
                                } else if (evt.targets[i].hp > damage + 1) {
                                    temp = 2;
                                }
                                if (temp > pri) {
                                    return 0;
                                }
                            }
                        }
                        return 1;
                    },
                    basic: {
                        order: 7.2,
                        useful: 1,
                        value: 5,
                    },
                    tag: {
                        respond: 1,
                        respondShan: 1,
                        damage: 1,
                        multitarget: 1,
                        multineg: 1,
                    },
                },
                "_priority": 0,
            },
            toushi: {
                audio: "ext:东方乱斗谈:2",
                trigger: {
                    global: "useCard",
                },
                filter(event, player) {
                     return event.player != player && get.type(event.card) == 'trick';
                 },
                async content(event, trigger, player) {
                     let card = game.createCard(trigger.card.name, trigger.card.suit, trigger.card.number);
                     let result = await player.chooseToUse(card, '偷师：是否立即使用一张【' + get.translation(card.name) + '】？').forResult();
                     if (result.bool) {
                         player.logSkill('toushi');
                     }
                 },
                ai: {
                    threaten: 1.2,
                },
                "_priority": 0,
            },
            lianfu: {
                audio: "ext:东方乱斗谈:2",
                enable: "phaseUse",
                limited: true,
                skillAnimation: true,
                animationColor: "fire",
                filterCard: () => false,
                selectCard: -1,
                filter: function(event, player) {
                     return !player.storage.lianfu;
                 },
                async content(event, trigger, player) {
                     player.storage.lianfu = true;
                     player.syncStorage('lianfu');
                     player.awakenSkill('lianfu');
                     let choices = ['主火花', '终极火花', '偷走技能'];
                     let choiceList = [
                         '弃置所有手牌（至少3张），对攻击范围内所有角色造成伤害',
                         '弃置装备区所有牌，摸等量牌，视为使用若干张【杀】',
                         '选择一名其他角色，永久获得其一个技能'
                     ];
                     let result = await player.chooseControl(choices).set('choiceList', choiceList).set('prompt', '恋符：请选择一项').forResult();
                     
                     if (result.control == '主火花') {
                         if (player.countCards('h') >= 3) {
                             let cards = player.getCards('h');
                             await player.discard(cards);
                             let num = Math.min(3, Math.ceil(cards.length / 2));
                             let targets = game.filterPlayer(function(current) {
                                 return current != player && player.inRange(current);
                             });
                             for (let target of targets) {
                                 target.damage(num, player);
                             }
                             player.logSkill('lianfu');
                         }
                     }
                     else if (result.control == '终极火花') {
                         let cards = player.getCards('e');
                         if (cards.length > 0) {
                             await player.discard(cards);
                             await player.draw(cards.length);
                             let num = cards.length + 1;
                             for (let i = 0; i < num; i++) {
                                 let targets = game.filterPlayer(function(current) {
                                     return current != player && player.canUse('sha', current, false);
                                 });
                                 if (targets.length > 0) {
                                     let target = targets.randomGet();
                                     await player.useCard({name: 'sha'}, target, false);
                                 }
                             }
                             player.logSkill('lianfu');
                         }
                     }
                     else if (result.control == '偷走技能') {
                         let targets = game.filterPlayer(function(current) {
                             return current != player;
                         });
                         if (targets.length > 0) {
                             let targetResult = await player.chooseTarget('选择一名其他角色', true, function(card, player, target) {
                                 return target != player;
                             }).forResult();
                             if (targetResult.bool && targetResult.targets && targetResult.targets[0]) {
                                 let target = targetResult.targets[0];
                                 let skills = target.getSkills().filter(function(skill) {
                                     let info = get.info(skill);
                                     return info && !info.charlotte && !info.unique && !info.limited && !info.juexingji;
                                 });
                                 if (skills.length > 0) {
                                     let skill = await player.chooseControl(skills).set('prompt', '选择要获得的技能').forResult();
                                     if (skill.control) {
                                         player.addSkillLog(skill.control);
                                         target.draw(3);
                                         player.logSkill('lianfu');
                                     }
                                 }
                             }
                         }
                     }
                 },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                },
                mark: true,
                intro: {
                    content: "limited",
                },
                init: (player, skill) => (player.storage[skill] = false),
                "_priority": 0,
            },
            geliya: {
                audio: "ext:东方乱斗谈:2",
                enable: "phaseUse",
                limited: true,
                skillAnimation: true,
                animationColor: "gold",
                filterCard: () => false,
                selectCard: -1,
                filter: function(event, player) {
                     return player.storage.renou >= 4 && !player.storage.geliya;
                 },
                async content(event, trigger, player) {
                     player.awakenSkill('geliya');
                     player.storage.geliya = true;
                     let num = player.storage.renou;
                     player.storage.renou = 0;
                     player.updateMarks("renoucaoyan");
                     game.log(player, "移除了所有人偶标记");
                     
                     let choices = ['人偶军团', '完美操控', '魔彩光'];
                     let choiceList = [
                         '获得' + num + '个歌莉娅人偶标记，每两个标记可抵挡一次伤害，' + num + '回合后可分配剩余标记数的杀',
                         '获得至多' + Math.ceil(num/2) + '名角色的所有手牌并重新分配',
                         '对所有其他角色造成1点伤害，并为每名角色创建守护人偶'
                     ];
                     let result = await player.chooseControl(choices).set('choiceList', choiceList).set('prompt', '歌莉娅：请选择一项').forResult();
                     
                     if (result.control == '人偶军团') {
                         // 新机制：获得歌莉娅人偶标记
                         if (!player.storage.geliya_puppet_marks) player.storage.geliya_puppet_marks = 0;
                         if (!player.storage.geliya_puppet_rounds) player.storage.geliya_puppet_rounds = 0;
                         
                         // 获得X个歌莉娅人偶标记（X为消耗的人偶标记数）
                         player.storage.geliya_puppet_marks += num;
                         player.storage.geliya_puppet_rounds = num; // X回合后可分配杀
                         player.syncStorage('geliya_puppet_marks');
                         player.syncStorage('geliya_puppet_rounds');
                         player.markSkill('geliya_puppet_marks');
                         
                         // 添加伤害抵挡技能和回合计数技能
                         if (!player.hasSkill('geliya_puppet_defense')) {
                             player.addSkill('geliya_puppet_defense');
                         }
                         if (!player.hasSkill('geliya_puppet_countdown')) {
                             player.addSkill('geliya_puppet_countdown');
                         }
                         
                         game.log(player, '获得了', num, '个歌莉娅人偶标记');
                         player.logSkill('geliya');
                     }

                     else if (result.control == '完美操控') {
                         let maxTargets = Math.ceil(num / 2);
                         let targets = await player.chooseTarget([1, maxTargets], '选择至多' + maxTargets + '名角色，获得其所有手牌').forResultTargets();
                         
                         if (targets && targets.length > 0) {
                             let allCards = [];
                             for (let target of targets) {
                                 let cards = target.getCards('h');
                                 if (cards.length > 0) {
                                     allCards.addArray(cards);
                                     await player.gain(cards, target, 'giveAuto');
                                 }
                             }
                             
                             // 重新分配手牌
                             if (allCards.length > 0) {
                                 let allPlayers = game.filterPlayer();
                                 for (let card of allCards) {
                                     let target = await player.chooseTarget('将' + get.translation(card) + '分配给一名角色', true).forResultTarget();
                                     if (target) {
                                         await player.give([card], target);
                                     }
                                 }
                             }
                         }
                         player.logSkill('geliya');
                     }
                     else if (result.control == '魔彩光') {
                         let targets = game.filterPlayer(function(current) {
                             return current != player;
                         });
                         for (let target of targets) {
                             await target.damage(1, player);
                         }
                         
                         // 为每名存活角色创建守护人偶
                         let survivors = game.filterPlayer(function(current) {
                             return current.isAlive();
                         });
                         for (let target of survivors) {
                             target.storage.shouhu_renou = true;
                             target.syncStorage("shouhu_renou");
                             target.markSkill("shouhu_renou");
                             game.log(player, "为", target, "创建了守护人偶");
                         }
                         player.logSkill('geliya');
                     }
                 },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                },
                mark: true,
                intro: {
                    content: "limited",
                },
                init: (player, skill) => (player.storage[skill] = false),
                "_priority": 0,
            },
            "geliya_legion_control": {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                filter: function(event, player) {
                     return player.storage.geliya_puppets && player.storage.geliya_puppets.length > 0;
                 },
                async content(event, trigger, player) {
                     // 在每个回合开始时检查并管理人偶
                     // 检查并移除已死亡的人偶（人偶现在存在时间无限，只有死亡才会移除）
                     let originalLength = player.storage.geliya_puppets.length;
                     player.storage.geliya_puppets = player.storage.geliya_puppets.filter(puppet => {
                         if (!puppet.isAlive()) {
                             game.log(puppet, "已死亡，从人偶列表中移除");
                             // 从全局人偶列表中移除
                             if (game.geliya_puppets) {
                                 let index = game.geliya_puppets.indexOf(puppet);
                                 if (index >= 0) game.geliya_puppets.splice(index, 1);
                             }
                             // 移除人偶节点
                             if (puppet.node && puppet.node.parentNode) {
                                 puppet.node.parentNode.removeChild(puppet.node);
                             }
                             return false;
                         }
                         return true;
                     });
                     
                     // 如果人偶列表发生变化，同步数据
                     if (player.storage.geliya_puppets.length !== originalLength) {
                         player.syncStorage('geliya_puppets');
                     }
                     
                     // 如果没有人偶了，移除技能
                     if (player.storage.geliya_puppets.length == 0) {
                         player.removeSkill('geliya_legion_control');
                         delete player.storage.geliya_puppets;
                         player.syncStorage('geliya_puppets');
                         game.log(player, "的歌莉娅人偶全部消失");
                     }
                 },
                "_priority": 0,
            },
            "geliya_puppet_marks": {
                marktext: "人偶",
                intro: {
                    name: "歌莉娅人偶",
                    content: function(storage, player) {
                         return "当前拥有" + (player.storage.geliya_puppet_marks || 0) + "个歌莉娅人偶。每两个标记可抵挡一次伤害。";
                     },
                },
                "_priority": 0,
            },
            "geliya_puppet_defense": {
                trigger: {
                    player: "damageBegin3",
                },
                forced: false,
                priority: 10,
                filter: function(event, player) {
                     return player.storage.geliya_puppet_marks && player.storage.geliya_puppet_marks >= 2;
                 },
                async content(event, trigger, player) {
                     game.log(player, "触发歌莉娅人偶抵挡伤害技能，当前标记数：", player.storage.geliya_puppet_marks);
                     let result = await player.chooseBool("是否消耗2个歌莉娅人偶标记，抵挡此次伤害？").forResult();
                     if (result.bool) {
                         player.storage.geliya_puppet_marks -= 2;
                         player.syncStorage('geliya_puppet_marks');
                         player.updateMarks('geliya_puppet_marks');
                         trigger.cancel();
                         game.log(player, "消耗了2个歌莉娅人偶标记，抵挡了此次伤害");
                         
                         // 如果标记用完，移除相关技能
                         if (player.storage.geliya_puppet_marks <= 0) {
                             player.removeSkill('geliya_puppet_defense');
                             player.removeSkill('geliya_puppet_countdown');
                             player.unmarkSkill('geliya_puppet_marks');
                         }
                     }
                 },
                ai: {
                    effect: {
                        target: function(card, player, target) {
                             if (get.tag(card, 'damage') && target.storage.geliya_puppet_marks >= 2) {
                                 return 0.5; // 减少伤害效果评估
                             }
                         },
                    },
                },
                "_priority": 1000,
            },
            "geliya_puppet_countdown": {
                trigger: {
                    player: "phaseBegin",
                },
                forced: true,
                filter: function(event, player) {
                     return player.storage.geliya_puppet_rounds > 0;
                 },
                async content(event, trigger, player) {
                     player.storage.geliya_puppet_rounds--;
                     player.syncStorage('geliya_puppet_rounds');
                     game.log(player, "歌莉娅人偶标记倒计时：还有", player.storage.geliya_puppet_rounds, "回合");
                     
                     if (player.storage.geliya_puppet_rounds <= 0) {
                         // X回合后，可以分配杀
                         if (player.storage.geliya_puppet_marks > 0) {
                             player.addTempSkill('geliya_puppet_attack_distribution');
                             game.log(player, "可以分配歌莉娅人偶标记的杀了！");
                         }
                         player.removeSkill('geliya_puppet_countdown');
                     }
                 },
                "_priority": 0,
            },
            "geliya_puppet_attack_distribution": {
                enable: "phaseUse",
                usable: 1,
                filterCard: () => false,
                selectCard: -1,
                filter: function(event, player) {
                     return player.storage.geliya_puppet_marks > 0;
                 },
                async content(event, trigger, player) {
                     let marks = player.storage.geliya_puppet_marks;
                     let maxTargets = marks;
                     
                     // 选择目标角色
                     let targets = await player.chooseTarget([1, maxTargets], 
                         "选择至多" + maxTargets + "名角色，分配" + marks + "张【杀】",
                         function(card, player, target) {
                             return target != player && target.isAlive();
                         }
                     ).forResultTargets();
                     
                     if (targets && targets.length > 0) {
                         // 分配杀的数量
                         let distribution = {};
                         let remainingMarks = marks;
                         
                         for (let i = 0; i < targets.length; i++) {
                             let target = targets[i];
                             let maxForThis = Math.min(remainingMarks, marks);
                             
                             if (i == targets.length - 1) {
                                 // 最后一个目标，分配剩余所有标记
                                 distribution[target.playerid] = remainingMarks;
                             } else {
                                 let result = await player.chooseControl(
                                     Array.from({length: maxForThis}, (_, i) => String(i + 1))
                                 ).set('prompt', '对' + get.translation(target) + '使用几张【杀】？（剩余' + remainingMarks + '张）').forResult();
                                 
                                 let num = parseInt(result.control);
                                 distribution[target.playerid] = num;
                                 remainingMarks -= num;
                             }
                         }
                         
                         // 执行杀的使用
                         for (let target of targets) {
                             let num = distribution[target.playerid];
                             if (num > 0) {
                                 for (let j = 0; j < num; j++) {
                                     let fakeCard = {
                                         name: 'sha',
                                         isCard: true,
                                         cards: [],
                                         _cardid: get.id()
                                     };
                                     
                                     if (player.canUse(fakeCard, target)) {
                                         await player.useCard(fakeCard, [target]);
                                         game.log(player, "通过歌莉娅人偶标记对", target, "使用了【杀】");
                                     }
                                 }
                             }
                         }
                         
                         // 清空标记
                         player.storage.geliya_puppet_marks = 0;
                         player.syncStorage('geliya_puppet_marks');
                         player.unmarkSkill('geliya_puppet_marks');
                         player.removeSkill('geliya_puppet_defense');
                         player.removeSkill('geliya_puppet_attack_distribution');
                         
                         game.log(player, "消耗了所有歌莉娅人偶标记");
                     }
                 },
                ai: {
                    order: 1,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            "mini_bagua_furnace": {
                trigger: {
                    player: "useCardToTargeted",
                },
                filter(event, player) {
                     return event.card.name == 'sha' && player.countCards('h') > 0;
                 },
                async content(event, trigger, player) {
                     const result = await player.chooseToDiscard('h', '是否弃置一张手牌，令此【杀】不可被【闪】响应且伤害+1？').forResult();
                     if (result.bool) {
                         trigger.card.directHit.addArray(trigger.targets);
                         if (typeof trigger.card.extraDamage != 'number') {
                             trigger.card.extraDamage = 0;
                         }
                         trigger.card.extraDamage++;
                         game.log(player, '令', trigger.card, '不可被闪避且伤害+1');
                     }
                 },
                ai: {
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            "magic_collection": {
                trigger: {
                    source: "damageSource",
                },
                filter(event, player) {
                     return !player.hasSkill('magic_collection_used');
                 },
                async content(event, trigger, player) {
                     const result = await player.chooseBool('是否发动【魔力收集】摸一张牌？').forResult();
                     if (result.bool) {
                         await player.draw();
                         player.addTempSkill('magic_collection_used');
                     }
                 },
                ai: {
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            "magic_collection_used": {
                charlotte: true,
                "_priority": 0,
            },
            "puppet_guard": {
                trigger: {
                    target: ["useCardToTarget"],
                },
                filter(event, player) {
                     return (event.card.name == 'sha' || event.card.name == 'juedou') && player.countCards('h') > 0;
                 },
                async content(event, trigger, player) {
                     const cardName = trigger.card.name == 'sha' ? '闪' : '杀';
                     const result = await player.chooseToDiscard('h', `是否弃置一张手牌，视为使用一张【${cardName}】？`).forResult();
                     if (result.bool) {
                         if (trigger.card.name == 'sha') {
                             await player.useCard({name: 'shan'}, trigger.card, trigger.source);
                         } else {
                             await player.useCard({name: 'sha'}, trigger.source);
                         }
                     }
                 },
                ai: {
                    result: {
                        target: 2,
                    },
                },
                "_priority": 0,
            },
            "puppet_performance": {
                enable: "phaseUse",
                usable: 1,
                filterCard: true,
                selectCard: 1,
                position: "h",
                viewAs: {
                    name: "sha",
                },
                filterTarget(card, player, target) {
                     return get.distance(player, target) <= 1 && target != player;
                 },
                ai: {
                    order: 3,
                    result: {
                        target: -1.5,
                    },
                    yingbian(card, player, targets, viewer) {
                        if (get.attitude(viewer, player) <= 0) {
                            return 0;
                        }
                        var base = 0,
                            hit = false;
                        if (get.cardtag(card, "yingbian_hit")) {
                            hit = true;
                            if (
                                targets.some(target => {
                                    return target.mayHaveShan(viewer, "use") && get.attitude(viewer, target) < 0 && get.damageEffect(target, player, viewer, get.natureList(card)) > 0;
                                })
                            ) {
                                base += 5;
                            }
                        }
                        if (get.cardtag(card, "yingbian_add")) {
                            if (
                                game.hasPlayer(function (current) {
                                    return !targets.includes(current) && lib.filter.targetEnabled2(card, player, current) && get.effect(current, card, player, player) > 0;
                                })
                            ) {
                                base += 5;
                            }
                        }
                        if (get.cardtag(card, "yingbian_damage")) {
                            if (
                                targets.some(target => {
                                    return (
                                        get.attitude(player, target) < 0 &&
                                        (hit ||
                                            !target.mayHaveShan(viewer, "use") ||
                                            player.hasSkillTag(
                                                "directHit_ai",
                                                true,
                                                {
                                                    target: target,
                                                    card: card,
                                                },
                                                true
                                            )) &&
                                        !target.hasSkillTag("filterDamage", null, {
                                            player: player,
                                            card: card,
                                            jiu: true,
                                        })
                                    );
                                })
                            ) {
                                base += 5;
                            }
                        }
                        return base;
                    },
                    canLink(player, target, card) {
                        if (!target.isLinked() && !player.hasSkill("wutiesuolian_skill")) {
                            return false;
                        }
                        if (player.hasSkill("jueqing") || player.hasSkill("gangzhi") || target.hasSkill("gangzhi")) {
                            return false;
                        }
                        let obj = {};
                        if (get.attitude(player, target) > 0 && get.attitude(target, player) > 0) {
                            if (
                                (player.hasSkill("jiu") ||
                                    player.hasSkillTag("damageBonus", true, {
                                        target: target,
                                        card: card,
                                    })) &&
                                !target.hasSkillTag("filterDamage", null, {
                                    player: player,
                                    card: card,
                                    jiu: player.hasSkill("jiu"),
                                })
                            ) {
                                obj.num = 2;
                            }
                            if (target.hp > obj.num) {
                                obj.odds = 1;
                            }
                        }
                        if (!obj.odds) {
                            obj.odds = 1 - target.mayHaveShan(player, "use", true, "odds");
                        }
                        return obj;
                    },
                    basic: {
                        useful: [5,3,1],
                        value: [5,3,1],
                    },
                    tag: {
                        respond: 1,
                        respondShan: 1,
                        damage(card) {
                            if (game.hasNature(card, "poison")) {
                                return;
                            }
                            return 1;
                        },
                        natureDamage(card) {
                            if (game.hasNature(card, "linked")) {
                                return 1;
                            }
                        },
                        fireDamage(card, nature) {
                            if (game.hasNature(card, "fire")) {
                                return 1;
                            }
                        },
                        thunderDamage(card, nature) {
                            if (game.hasNature(card, "thunder")) {
                                return 1;
                            }
                        },
                        poisonDamage(card, nature) {
                            if (game.hasNature(card, "poison")) {
                                return 1;
                            }
                        },
                    },
                },
                group: "puppet_performance_draw",
                "_priority": 0,
            },
            "puppet_performance_draw": {
                trigger: {
                    player: "useCardAfter",
                },
                filter(event, player) {
                     return event.skill == 'puppet_performance';
                 },
                forced: true,
                async content(event, trigger, player) {
                     await player.draw();
                 },
                "_priority": 0,
            },
            "zhongdu_mark": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                filter(event, player) {
                     return player.countMark('zhongdu') > 0;
                 },
                forced: true,
                async content(event, trigger, player) {
                     await player.loseHp();
                     game.log(player, '因中毒失去1点体力');
                 },
                mark: true,
                marktext: "毒",
                intro: {
                    name: "中毒",
                    content: function(storage, player) {
                         return '准备阶段失去1点体力，使用【桃】时需额外弃置一张牌。当前中毒标记数：' + player.countMark('zhongdu');
                     },
                },
                onremove: function(player) {
                     player.unmarkSkill('zhongdu_mark');
                 },
                group: ["zhongdu_mark_tao","zhongdu_mark_die"],
                "_priority": 0,
            },
            "zhongdu_mark_tao": {
                trigger: {
                    player: "useCard",
                },
                filter(event, player) {
                     return event.card.name == 'tao' && player.countMark('zhongdu') > 0;
                 },
                forced: true,
                async content(event, trigger, player) {
                     if (player.countCards('he') > 0) {
                         await player.chooseToDiscard('he', 1, true, '中毒：使用【桃】需额外弃置一张牌');
                     }
                 },
                "_priority": 0,
            },
            "zhongdu_mark_die": {
                trigger: {
                    player: "die",
                },
                forced: true,
                popup: false,
                async content(event, trigger, player) {
                     player.clearMark('zhongdu');
                     player.removeSkill('zhongdu_mark');
                 },
                "_priority": 0,
            },
            dufu: {
                enable: "phaseUse",
                usable: 2,
                filter(event, player) {
                      return player.countCards('h') > 0;
                  },
                content: function() {
                      "step 0"
                      var cards = player.getCards('h');
                      var choices = [];
                      var choiceList = [];
                      
                      // 检查可用选项
                      if (cards.some(card => get.color(card) == 'red')) {
                          choices.push('红色牌当酒');
                          choiceList.push('将一张红色牌当作【酒】使用，目标获得中毒标记');
                      }
                      if (cards.some(card => get.color(card) == 'black')) {
                          choices.push('黑色牌当兵粮寸断');
                          choiceList.push('将一张黑色牌当作【兵粮寸断】使用，若目标有中毒标记则摸一张牌');
                      }
                      if (cards.some(card => get.type(card) == 'equip')) {
                          choices.push('装备牌当杀');
                          choiceList.push('将一张装备牌当作【杀】使用，造成伤害后目标获得中毒标记');
                      }
                      
                      if (choices.length == 0) {
                          event.finish();
                          return;
                      }
                      
                      player.chooseControl(choices, 'cancel2')
                          .set('choiceList', choiceList)
                          .set('prompt', '毒符：选择一种效果');
                      
                      "step 1"
                      if (result.control == 'cancel2') {
                          event.finish();
                          return;
                      }
                      
                      event.choice = result.control;
                      
                      if (result.control == '红色牌当酒') {
                          player.chooseCard('h', 1, '选择一张红色牌', function(card) {
                              return get.color(card) == 'red';
                          });
                      } else if (result.control == '黑色牌当兵粮寸断') {
                          player.chooseCard('h', 1, '选择一张黑色牌', function(card) {
                              return get.color(card) == 'black';
                          });
                      } else if (result.control == '装备牌当杀') {
                          player.chooseCard('h', 1, '选择一张装备牌', function(card) {
                              return get.type(card) == 'equip';
                          });
                      }
                      
                      "step 2"
                      if (!result.bool) {
                          event.finish();
                          return;
                      }
                      
                      event.cards = result.cards;
                      
                      if (event.choice == '红色牌当酒') {
                          player.chooseTarget('选择【酒】的目标', 1, function(card, player, target) {
                              return player.canUse('jiu', target);
                          });
                      } else if (event.choice == '黑色牌当兵粮寸断') {
                          player.chooseTarget('选择【兵粮寸断】的目标', 1, function(card, player, target) {
                              return target != player && !target.hasJudge('bingliang');
                          });
                      } else if (event.choice == '装备牌当杀') {
                          player.chooseTarget('选择【杀】的目标', 1, function(card, player, target) {
                              return target != player && player.canUse('sha', target);
                          });
                      }
                      
                      "step 3"
                      if (!result.bool) {
                          event.finish();
                          return;
                      }
                      
                      var target = result.targets[0];
                      
                      if (event.choice == '红色牌当酒') {
                          player.useCard({name: 'jiu'}, event.cards, target);
                          target.addMark('zhongdu', 1);
                          target.addSkill('zhongdu_mark');
                          game.log(target, '获得了中毒标记');
                      } else if (event.choice == '黑色牌当兵粮寸断') {
                          player.useCard({name: 'bingliang'}, event.cards, target);
                          if (target.countMark('zhongdu') > 0) {
                              player.draw();
                              game.log(player, '因目标有中毒标记而摸了一张牌');
                          }
                      } else if (event.choice == '装备牌当杀') {
                          // 添加伤害后中毒的标记
                          player.addTempSkill('dufu_sha_mark');
                          player.storage.dufu_sha_target = target;
                          player.useCard({name: 'sha'}, event.cards, target);
                      }
                  },
                ai: {
                    order: 7,
                    result: {
                        player(player) {
                              return 1;
                          },
                    },
                },
                "_priority": 0,
            },
            "dufu_sha_mark": {
                trigger: {
                    source: "damageEnd",
                },
                forced: true,
                popup: false,
                filter(event, player) {
                   return player.storage.dufu_sha_target && event.player == player.storage.dufu_sha_target;
               },
                async content(event, trigger, player) {
                   const target = trigger.player;
                   target.addMark('zhongdu', 1);
                   target.addSkill('zhongdu_mark');
                   game.log(target, '获得了中毒标记');
                   delete player.storage.dufu_sha_target;
                   player.removeSkill('dufu_sha_mark');
               },
                "_priority": 0,
            },
            linglan: {
                trigger: {
                    source: "damageBegin1",
                    global: "loseHpAfter",
                    player: "phaseZhunbeiBegin",
                    target: "useCardToTargeted",
                },
                forced: true,
                filter(event, player, name) {
                      if (name == 'damageBegin1') {
                          return event.player.countMark('zhongdu') > 0;
                      }
                      if (name == 'loseHpAfter') {
                          return event.player != player && event.getParent().name == 'zhongdu_mark';
                      }
                      if (name == 'phaseZhunbeiBegin') {
                          return true;
                      }
                      if (name == 'useCardToTargeted') {
                          return event.card.name == 'jiu' && event.target == player;
                      }
                      return false;
                  },
                content: function() {
                      "step 0"
                      if (event.triggername == 'damageBegin1') {
                          // 对中毒角色伤害+1
                          trigger.num++;
                          game.log(player, '铃兰：对中毒角色造成的伤害+1');
                          event.finish();
                      } else if (event.triggername == 'loseHpAfter') {
                          // 其他角色中毒失血时摸牌
                          player.draw();
                          game.log(player, '铃兰：因其他角色中毒失血而摸牌');
                          event.finish();
                      } else if (event.triggername == 'phaseZhunbeiBegin') {
                          // 回合开始选择角色中毒
                          player.chooseTarget('铃兰：选择一名角色获得中毒标记', true)
                              .set('ai', function(target) {
                                  if (target == player) return 0;
                                  if (get.attitude(player, target) >= 0) return 0;
                                  return -get.attitude(player, target);
                              });
                      } else if (event.triggername == 'useCardToTargeted') {
                          // 酒变回血
                          trigger.excluded.add(player);
                          player.recover();
                          game.log(player, '铃兰：【酒】对你无效，改为回复1点体力');
                          event.finish();
                      }
                      
                      "step 1"
                      if (event.triggername == 'phaseZhunbeiBegin') {
                          if (result.bool && result.targets && result.targets.length > 0) {
                              var target = result.targets[0];
                              target.addMark('zhongdu', 1);
                              target.addSkill('zhongdu_mark');
                              game.log(target, '获得了中毒标记');
                          }
                      }
                  },
                mod: {
                    globalFrom(from, to, distance) {
                          // 中毒角色与你距离+1
                          if (to.countMark('zhongdu') > 0) {
                              return distance + 1;
                          }
                      },
                },
                group: ["linglan_immune"],
                "_priority": 0,
            },
            "linglan_immune": {
                trigger: {
                    player: "addMarkBefore",
                },
                filter(event, player) {
                      return event.mark == 'zhongdu';
                  },
                forced: true,
                async content(event, trigger, player) {
                      trigger.cancel();
                      game.log(player, '铃兰：免疫中毒效果');
                  },
                "_priority": 0,
            },
            renou: {
                trigger: {
                    player: "damageBegin3",
                    target: "useCardToTargeted",
                },
                filter(event, player, name) {
                      if (name == 'gainAfter') {
                          return event.cards && event.cards.some(card => get.type(card) == 'equip');
                      }
                      if (name == 'useCardToTargeted') {
                          return (event.card.name == 'lebusishu' || event.card.name == 'bingliang') && event.target == player;
                      }
                      if (name == 'damageBegin3') {
                          return event.nature == undefined; // 无属性伤害
                      }
                      return false;
                  },
                async content(event, trigger, player) {
                      if (event.triggername == 'gainAfter') {
                          // 获得装备牌时的处理
                          const equipCards = trigger.cards.filter(card => get.type(card) == 'equip');
                          for (let card of equipCards) {
                              const result = await player.chooseControl('当作杀使用', '弃置并中毒', 'cancel2')
                                  .set('prompt', `人偶：如何处理装备牌${get.translation(card)}？`)
                                  .set('ai', () => {
                                      const poisonedTargets = game.filterPlayer(current => current.countMark('zhongdu') > 0 && get.attitude(player, current) < 0);
                                      if (poisonedTargets.length > 0) return '当作杀使用';
                                      return '弃置并中毒';
                                  });
                              
                              if (result.control == '当作杀使用') {
                                  // 选择有中毒标记的角色
                                  const targets = game.filterPlayer(current => current.countMark('zhongdu') > 0);
                                  if (targets.length > 0) {
                                      const targetResult = await player.chooseTarget('选择一名有中毒标记的角色', (card, player, target) => {
                                          return target.countMark('zhongdu') > 0;
                                      });
                                      if (targetResult.bool && targetResult.targets && targetResult.targets.length > 0) {
                                          await player.useCard({name: 'sha'}, [card], targetResult.targets[0]);
                                      }
                                  }
                              } else if (result.control == '弃置并中毒') {
                                  await player.discard(card);
                                  const targetResult = await player.chooseTarget('选择一名角色获得中毒标记', true);
                                  if (targetResult.bool && targetResult.targets && targetResult.targets.length > 0) {
                                      const target = targetResult.targets[0];
                                      target.addMark('zhongdu', 1);
                                      target.addSkill('zhongdu_mark');
                                      game.log(target, '获得了中毒标记');
                                  }
                              }
                          }
                      } else if (event.triggername == 'useCardToTargeted') {
                          // 延时锦囊反制
                          const source = trigger.player;
                          source.addMark('zhongdu', 1);
                          source.addSkill('zhongdu_mark');
                          game.log(source, '因对梅蒂欣使用延时锦囊而获得中毒标记');
                      } else if (event.triggername == 'damageBegin3') {
                          // 无属性伤害减免
                          if (player.countCards('he', {color: 'black'}) > 0) {
                              const result = await player.chooseToDiscard('he', 1, '人偶：是否弃置一张黑色牌令此伤害-1？', (card) => {
                                  return get.color(card) == 'black';
                              });
                              if (result.bool) {
                                  trigger.num = Math.max(0, trigger.num - 1);
                                  game.log(player, '人偶：弃置黑色牌，伤害-1');
                              }
                          }
                      }
                  },
                mod: {
                    cardEnabled2(card, player) {
                          // 无装备区
                          if (get.type(card) == 'equip') return false;
                      },
                },
                "_priority": 0,
            },
            jiefang: {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                filter(event, player) {
                      if (player.storage.jiefang) return false;
                      // 计算场上中毒标记总数
                      let count = 0;
                      for (let current of game.players) {
                          count += current.countMark('zhongdu');
                      }
                      return count >= 5;
                  },
                forced: true,
                skillAnimation: true,
                animationColor: "fire",
                async content(event, trigger, player) {
                      player.storage.jiefang = true;
                      await player.loseMaxHp();
                      await player.addSkill(['duwu', 'susheng']);
                      game.log(player, '觉醒了！获得了【毒雾】和【苏生】');
                  },
                "_priority": 0,
            },
            duwu: {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                forced: true,
                async content(event, trigger, player) {
                      // 所有其他角色选择
                      for (let target of game.filterPlayer(current => current != player)) {
                          const result = await target.chooseToDiscard('h', 1, '毒雾：弃置一张红色牌，否则获得中毒标记', (card) => {
                              return get.color(card) == 'red';
                          }).set('ai', (card) => {
                              return 6 - get.value(card);
                          });
                          
                          if (!result.bool) {
                              target.addMark('zhongdu', 1);
                              target.addSkill('zhongdu_mark');
                              game.log(target, '获得了中毒标记');
                          }
                      }
                  },
                group: ["duwu_damage"],
            },
            "duwu_damage": {
                enable: "phaseUse",
                usable: 1,
                filterTarget(card, player, target) {
                      return target.countMark('zhongdu') > 0;
                  },
                async content(event, trigger, player) {
                      const target = event.target;
                      const marks = target.countMark('zhongdu');
                      target.removeMark('zhongdu', marks);
                      if (target.countMark('zhongdu') == 0) target.removeSkill('zhongdu_mark');
                      await target.damage(marks, player);
                      game.log(player, `移除了${target}的${marks}个中毒标记，对其造成${marks}点伤害`);
                  },
                ai: {
                    order: 8,
                    result: {
                        target(player, target) {
                              return -target.countMark('zhongdu');
                          },
                    },
                },
                "_priority": 0,
            },
            susheng: {
                trigger: {
                    global: "die",
                },
                filter(event, player) {
                      return event.player.countMark('zhongdu') > 0 && player.countCards('h') >= 2;
                  },
                async content(event, trigger, player) {
                      const result = await player.chooseToDiscard('h', player.countCards('h'), '苏生：是否弃置所有手牌令其复活？');
                      if (result.bool) {
                          const target = trigger.player;
                          target.revive(1);
                          target.addMark('renou_puppet', 1);
                          target.addSkill('renou_puppet_effect');
                          game.log(target, '复活了，但获得了人偶标记');
                      }
                  },
                ai: {
                    expose: 0.3,
                    result: {
                        player(player, target) {
                              const deadPlayer = _status.event.dying || _status.event.player;
                              if (!deadPlayer) return 0;
                              const attitude = get.attitude(player, deadPlayer);
                              if (attitude > 0) return 2; // 友方角色，值得复活
                              if (attitude < 0) return -1; // 敌方角色，不要复活
                              return 0;
                          },
                    },
                },
            },
            "renou_puppet_effect": {
                trigger: {
                    player: "recoverBefore",
                },
                forced: true,
                filter(event, player) {
                      return player.countMark('renou_puppet') > 0;
                  },
                async content(event, trigger, player) {
                      trigger.cancel();
                      game.log(player, '人偶标记：无法回复体力');
                  },
                mark: true,
                intro: {
                    name: "人偶",
                    content: "无法回复体力，受梅蒂欣控制进行回合",
                },
                marktext: "偶",
                "_priority": 0,
            },
            "kuangluan_mark": {
                trigger: {
                    player: "useCardBefore",
                },
                forced: true,
                filter(event, player) {
                      return player.countMark('kuangluan') > 0;
                  },
                content() {
                      "step 0"
                      // 展示要使用的牌
                      player.showCards([trigger.card], '狂乱标记：展示使用的牌');
                      
                      "step 1"
                      // 其他角色可以弃置相同花色的牌令此牌无效
                      const suit = get.suit(trigger.card);
                      const targets = game.filterPlayer(current => {
                          return current != player && current.countCards('he', {suit: suit}) > 0;
                      });
                      
                      if (targets.length > 0) {
                          event.targets = targets;
                          event.current = 0;
                      } else {
                          event.finish();
                      }
                      
                      "step 2"
                      if (event.current < event.targets.length) {
                          const target = event.targets[event.current];
                          target.chooseCard('he', {suit: get.suit(trigger.card)}, 
                              `是否弃置一张${get.translation(get.suit(trigger.card))}牌令${get.translation(player)}的${get.translation(trigger.card)}无效？`
                          ).set('ai', function(card) {
                              const attitude = get.attitude(target, player);
                              if (attitude < 0) return 10; // 敌对时弃置
                              return 0;
                          }).then(result => {
                              if (result.bool) {
                                  target.discard(result.cards);
                                  trigger.cancel();
                                  game.log(target, '弃置了', result.cards, '令', trigger.card, '无效');
                                  event.finish();
                              } else {
                                  event.current++;
                                  event.redo();
                              }
                          });
                      } else {
                          event.finish();
                      }
                  },
                mark: true,
                intro: {
                    name: "狂乱",
                    content: "使用牌时需先展示，其他角色可以弃置相同花色的牌令此牌无效。每回合限两次。",
                },
                marktext: "乱",
                "_priority": 0,
            },
            kuangbo: {
                enable: "phaseUse",
                filterCard: true,
                selectCard: 1,
                position: "h",
                filterTarget(card, player, target) {
                      return target != player;
                  },
                init(player) {
                      if (!player.storage.kuangbo_count) {
                          player.storage.kuangbo_count = 0;
                      }
                  },
                content() {
                      "step 0"
                      // 记录发动次数
                      player.storage.kuangbo_count++;
                      player.syncStorage('kuangbo_count');
                      
                      // 展示手牌
                      player.showCards(cards, '狂波');
                      const card = cards[0];
                      const color = get.color(card);
                      const number = get.number(card);
                      
                      event.card = card;
                      event.color = color;
                      event.number = number;
                      
                      "step 1"
                      // 根据颜色产生效果
                      if (event.color == 'red') {
                          // 红色牌效果
                          target.chooseControl('弃置两张牌', '将武将牌翻面')
                              .set('prompt', '狂波（红色牌）：选择一项')
                              .set('ai', function() {
                                  if (target.countCards('he') >= 2) return '弃置两张牌';
                                  return '将武将牌翻面';
                              });
                      } else if (event.color == 'black') {
                          // 黑色牌效果
                          target.chooseControl('本回合不能使用【杀】', '展示所有手牌')
                              .set('prompt', '狂波（黑色牌）：选择一项')
                              .set('ai', function() {
                                  if (target.countCards('h', 'sha') == 0) return '本回合不能使用【杀】';
                                  return '展示所有手牌';
                              });
                      } else {
                          event.goto(3);
                      }
                      
                      "step 2"
                      if (event.color == 'red') {
                          if (result.control == '弃置两张牌') {
                              target.chooseToDiscard(2, 'he', true);
                          } else {
                              target.turnOver();
                          }
                      } else if (event.color == 'black') {
                          if (result.control == '本回合不能使用【杀】') {
                              target.addTempSkill('kuangbo_nosa', 'phaseAfter');
                              game.log(target, '本回合不能使用【杀】');
                          } else {
                              const handCards = target.getCards('h');
                              if (handCards.length > 0) {
                                  target.showCards(handCards, '展示所有手牌');
                                  player.chooseCardButton(handCards, '选择获得一张牌', true)
                                      .set('ai', function(button) {
                                          return get.value(button.link);
                                      });
                              }
                          }
                      }
                      
                      "step 3"
                      if (event.color == 'black' && result && result.bool && result.links) {
                          player.gain(result.links, target, 'give');
                      }
                      
                      "step 4"
                      // 点数大于10的效果
                      if (event.number > 10) {
                          target.addMark('kuangluan', 1);
                          target.addSkill('kuangluan_mark');
                          game.log(target, '获得了狂乱标记');
                      }
                  },
                ai: {
                    order: 7,
                    result: {
                        target(player, target) {
                              return -1;
                          },
                    },
                },
                "_priority": 0,
            },
            "kuangbo_nosa": {
                mod: {
                    cardEnabled(card, player) {
                          if (card.name == 'sha') return false;
                      },
                    cardUsable(card, player) {
                          if (card.name == 'sha') return false;
                      },
                },
                mark: true,
                intro: {
                    content: "本回合不能使用【杀】",
                },
                "_priority": 0,
            },
            "huanshi_kuangluan": {
                trigger: {
                    target: "useCardToTarget",
                },
                filter(event, player) {
                   return event.player != player && event.player.countMark('kuangluan') > 0;
               },
                forced: true,
                content() {
                   player.draw();
                   game.log(player, '因幻视技能摸了一张牌');
               },
                "_priority": 0,
            },
            yuetu: {
                trigger: {
                    target: ["shaBegin","useCardToTargeted"],
                    player: ["damageBegin","phaseDrawEnd"],
                },
                forced(event, player, name) {
                    // phaseDrawEnd是被动效果，应该强制触发
                    return name == 'phaseDrawEnd';
                },
                filter(event, player, name) {
                    if (name == 'shaBegin' || name == 'useCardToTargeted') {
                        if (name == 'shaBegin') return true;
                        return get.type(event.card) == 'trick';
                    }
                    if (name == 'damageBegin') {
                        return !player.storage.yuetu_damaged;
                    }
                    if (name == 'phaseDrawEnd') {
                        // 被动效果，检查是否有狂乱标记
                        let kuangluanCount = 0;
                        game.players.forEach(current => {
                            kuangluanCount += current.countMark('kuangluan');
                        });
                        return kuangluanCount > 0;
                    }
                },
                async content(event, trigger, player) {
                    if (event.triggername == 'shaBegin' || event.triggername == 'useCardToTargeted') {
                        // 进行判定
                        const judgeResult = await player.judge('yuetu', function(card) {
                            const suit = get.suit(card);
                            if (suit == 'heart') return 3;
                            if (suit == 'diamond') return 2;
                            return 1;
                        }).forResult();
                        
                        const suit = get.suit(judgeResult.card);
                        if (suit == 'heart') {
                            // 红桃：此牌对你无效，使用者获得狂乱标记
                            trigger.cancel();
                            trigger.player.addMark('kuangluan', 1);
                            trigger.player.addSkill('kuangluan_mark');
                            game.log(trigger.player, '获得了狂乱标记');
                            game.log('此牌对', player, '无效');
                        } else if (suit == 'diamond') {
                            // 方块：你摸两张牌
                            await player.draw(2);
                        } else {
                            // 其他：你可以弃置一张牌移动到其他位置
                            const discardResult = await player.chooseToDiscard('he', '是否弃置一张牌移动到其他位置？')
                                .set('ai', function(card) {
                                    return 6 - get.value(card);
                                }).forResult();
                            
                            if (discardResult.bool) {
                                const targets = game.filterPlayer(current => current != player);
                                if (targets.length > 0) {
                                    const targetResult = await player.chooseTarget('选择移动到的位置', function(card, player, target) {
                                        return target != player;
                                    }, true).set('ai', function(target) {
                                        return get.attitude(player, target);
                                    }).forResult();
                                    
                                    if (targetResult.bool && targetResult.targets && targetResult.targets.length > 0) {
                                        const target = targetResult.targets[0];
                                        const index = game.players.indexOf(target);
                                        game.players.remove(player);
                                        game.players.splice(index, 0, player);
                                        game.arrangePlayers();
                                        game.log(player, '移动到了', target, '的位置');
                                    }
                                }
                            }
                        }
                    } else if (event.triggername == 'damageBegin') {
                        // 每回合首次受到伤害时，防止此伤害，改为失去等量的手牌
                        player.storage.yuetu_damaged = true;
                        player.addTempSkill('yuetu_damaged_clear', 'phaseAfter');
                        
                        const num = trigger.num;
                        trigger.cancel();
                        
                        if (player.countCards('h') >= num) {
                            await player.chooseToDiscard(num, 'h', true, '月兔：失去' + num + '张手牌代替受到伤害');
                        } else {
                            player.discard(player.getCards('h'));
                        }
                        
                        game.log(player, '的月兔技能防止了', num, '点伤害');
                    } else if (event.triggername == 'phaseDrawEnd') {
                        // 手牌上限+X（X为场上狂乱标记数）- 被动效果
                        let kuangluanCount = 0;
                        game.players.forEach(current => {
                            kuangluanCount += current.countMark('kuangluan');
                        });
                        
                        player.addTempSkill('yuetu_maxhand');
                        player.storage.yuetu_maxhand = kuangluanCount;
                        player.syncStorage('yuetu_maxhand');
                        game.log(player, '的手牌上限增加了', kuangluanCount);
                    }
                },
                "_priority": 0,
            },
            "yuetu_damaged_clear": {
                trigger: {
                    player: "phaseAfter",
                },
                forced: true,
                popup: false,
                content() {
                    delete player.storage.yuetu_damaged;
                },
                "_priority": 0,
            },
            "yuetu_maxhand": {
                mod: {
                    maxHandcard(player, num) {
                        return num + (player.storage.yuetu_maxhand || 0);
                    },
                },
                mark: true,
                intro: {
                    content: function(storage) {
                        return '手牌上限+' + storage;
                    },
                },
                "_priority": 0,
            },
            yaoshi: {
                trigger: {
                    player: "phaseBegin",
                },
                filter(event, player) {
                     return !player.storage.yaoshi_awakened && player.storage.kuangbo_count >= 7;
                 },
                forced: true,
                skillAnimation: true,
                animationColor: "thunder",
                content() {
                     "step 0"
                     player.storage.yaoshi_awakened = true;
                     player.syncStorage('yaoshi_awakened');
                     
                     player.gainMaxHp();
                     player.recover();
                     
                     player.addSkill('bochang');
                     player.addSkill('yueyao');
                     
                     game.log(player, '觉醒了药师技能，获得了波长和月药');
                 },
                derivation: ["bochang","yueyao"],
                "_priority": 0,
            },
            bochang: {
                enable: "phaseUse",
                usable: 1,
                content() {
                     "step 0"
                     player.chooseControl('所有角色展示手牌', '移除狂乱标记', '获得狂乱角色手牌')
                         .set('prompt', '波长：选择一项')
                         .set('ai', function() {
                             // AI优先选择移除狂乱标记摸牌
                             let kuangluanCount = 0;
                             game.players.forEach(current => {
                                 kuangluanCount += current.countMark('kuangluan');
                             });
                             if (kuangluanCount >= 2) return '移除狂乱标记';
                             
                             // 其次选择获得手牌
                             const kuangluanPlayers = game.players.filter(current => current.countMark('kuangluan') > 0 && current.countCards('h') > 0);
                             if (kuangluanPlayers.length > 0) return '获得狂乱角色手牌';
                             
                             return '所有角色展示手牌';
                         });
                     
                     "step 1"
                     if (result.control == '所有角色展示手牌') {
                         // 所有角色展示一张手牌，点数最大的角色获得狂乱标记并弃置两张牌
                         const showResults = [];
                         game.players.forEach(current => {
                             if (current.countCards('h') > 0) {
                                 const card = current.getCards('h').randomGet();
                                 current.showCards([card], current.name + '展示的手牌');
                                 showResults.push({player: current, card: card, number: get.number(card)});
                             }
                         });
                         
                         if (showResults.length > 0) {
                             showResults.sort((a, b) => b.number - a.number);
                             const maxNumber = showResults[0].number;
                             const maxPlayers = showResults.filter(item => item.number == maxNumber);
                             
                             maxPlayers.forEach(item => {
                                 item.player.addMark('kuangluan', 1);
                                 item.player.addSkill('kuangluan_mark');
                                 item.player.chooseToDiscard(2, 'he', true, '波长效果：弃置两张牌');
                                 game.log(item.player, '获得了狂乱标记并弃置两张牌');
                             });
                         }
                     } else if (result.control == '移除狂乱标记') {
                         // 移除场上所有狂乱标记，你摸等量的牌
                         let totalMarks = 0;
                         game.players.forEach(current => {
                             const marks = current.countMark('kuangluan');
                             if (marks > 0) {
                                 totalMarks += marks;
                                 current.removeMark('kuangluan', marks);
                                 if (current.countMark('kuangluan') == 0) {
                                     current.removeSkill('kuangluan_mark');
                                 }
                             }
                         });
                         
                         if (totalMarks > 0) {
                             player.draw(totalMarks);
                             game.log(player, '移除了', totalMarks, '个狂乱标记，摸了', totalMarks, '张牌');
                         }
                     } else if (result.control == '获得狂乱角色手牌') {
                         // 选择一名有狂乱标记的角色，获得其所有手牌，然后你交给其等量的牌
                         const kuangluanPlayers = game.players.filter(current => current.countMark('kuangluan') > 0);
                         if (kuangluanPlayers.length > 0) {
                             player.chooseTarget('选择一名有狂乱标记的角色', function(card, player, target) {
                                 return target.countMark('kuangluan') > 0;
                             }, true).set('ai', function(target) {
                                 return target.countCards('h');
                             });
                         }
                     }
                     
                     "step 2"
                     if (result && result.bool && result.targets && result.targets.length > 0) {
                         const target = result.targets[0];
                         const handCards = target.getCards('h');
                         const cardCount = handCards.length;
                         
                         if (cardCount > 0) {
                             player.gain(handCards, target, 'give');
                             
                             if (player.countCards('he') >= cardCount) {
                                 player.chooseCard('he', cardCount, '选择交给' + get.translation(target) + cardCount + '张牌', true)
                                     .set('ai', function(card) {
                                         return -get.value(card);
                                     });
                             }
                         }
                     }
                     
                     "step 3"
                     if (result && result.bool && result.cards) {
                         const target = event.result.targets[0];
                         target.gain(result.cards, player, 'give');
                     }
                 },
                ai: {
                    order: 8,
                    result: {
                        player: 1,
                    },
                },
                "_priority": 0,
            },
            yueyao: {
                enable: ["chooseToUse","chooseToRespond"],
                filterCard(card, player) {
                      return get.color(card) == 'black';
                  },
                viewAs: {
                    name: "tao",
                },
                viewAsFilter(player) {
                      return player.countCards('he', {color: 'black'}) > 0;
                  },
                prompt: "将一张黑色牌当【桃】使用",
                check(card) {
                      return 15 - get.value(card);
                  },
                group: ["yueyao_extra","yueyao_guoshi"],
                ai: {
                    basic: {
                        order: (card, player) => {
                            if (player.hasSkillTag("pretao")) {
                                return 9;
                            }
                            return 2;
                        },
                        useful: (card, i) => {
                            let player = _status.event.player;
                            if (!game.checkMod(card, player, "unchanged", "cardEnabled2", player)) {
                                return 2 / (1 + i);
                            }
                            let fs = game.filterPlayer(current => {
                                    return get.attitude(player, current) > 0 && current.hp <= 2;
                                }),
                                damaged = 0,
                                needs = 0;
                            fs.forEach(f => {
                                if (f.hp > 3 || !lib.filter.cardSavable(card, player, f)) {
                                    return;
                                }
                                if (f.hp > 1) {
                                    damaged++;
                                } else {
                                    needs++;
                                }
                            });
                            if (needs && damaged) {
                                return 5 * needs + 3 * damaged;
                            }
                            if (needs + damaged > 1 || player.hasSkillTag("maixie")) {
                                return 8;
                            }
                            if (player.hp / player.maxHp < 0.7) {
                                return 7 + Math.abs(player.hp / player.maxHp - 0.5);
                            }
                            if (needs) {
                                return 7;
                            }
                            if (damaged) {
                                return Math.max(3, 7.8 - i);
                            }
                            return Math.max(1, 7.2 - i);
                        },
                        value: (card, player) => {
                            let fs = game.filterPlayer(current => {
                                    return get.attitude(_status.event.player, current) > 0;
                                }),
                                damaged = 0,
                                needs = 0;
                            fs.forEach(f => {
                                if (!player.canUse("tao", f)) {
                                    return;
                                }
                                if (f.hp <= 1) {
                                    needs++;
                                } else if (f.hp === 2) {
                                    damaged++;
                                }
                            });
                            if ((needs && damaged) || player.hasSkillTag("maixie")) {
                                return Math.max(9, 5 * needs + 3 * damaged);
                            }
                            if (needs || damaged > 1) {
                                return 8;
                            }
                            if (damaged) {
                                return 7.5;
                            }
                            return Math.max(5, 9.2 - player.hp);
                        },
                    },
                    result: {
                        target: (player, target) => {
                            if (target.hasSkillTag("maixie")) {
                                return 3;
                            }
                            return 2;
                        },
                        "target_use": (player, target, card) => {
                            let mode = get.mode(),
                                taos = player.getCards("hs", i => get.name(i) === "tao" && lib.filter.cardEnabled(i, target, "forceEnable"));
                            if (target !== _status.event.dying) {
                                if (
                                    !player.isPhaseUsing() ||
                                    player.needsToDiscard(0, (i, player) => {
                                        return !player.canIgnoreHandcard(i) && taos.includes(i);
                                    }) ||
                                    player.hasSkillTag(
                                        "nokeep",
                                        true,
                                        {
                                            card: card,
                                            target: target,
                                        },
                                        true
                                    )
                                ) {
                                    return 2;
                                }
                                let min = 8.1 - (4.5 * player.hp) / player.maxHp,
                                    nd = player.needsToDiscard(0, (i, player) => {
                                        return !player.canIgnoreHandcard(i) && (taos.includes(i) || get.value(i) >= min);
                                    }),
                                    keep = nd ? 0 : 2;
                                if (nd > 2 || (taos.length > 1 && (nd > 1 || (nd && player.hp < 1 + taos.length))) || (target.identity === "zhu" && (nd || target.hp < 3) && (mode === "identity" || mode === "versus" || mode === "chess")) || !player.hasFriend()) {
                                    return 2;
                                }
                                if (
                                    game.hasPlayer(current => {
                                        return player !== current && current.identity === "zhu" && current.hp < 3 && (mode === "identity" || mode === "versus" || mode === "chess") && get.attitude(player, current) > 0;
                                    })
                                ) {
                                    keep = 3;
                                } else if (nd === 2 || player.hp < 2) {
                                    return 2;
                                }
                                if (nd === 2 && player.hp <= 1) {
                                    return 2;
                                }
                                if (keep === 3) {
                                    return 0;
                                }
                                if (taos.length <= player.hp / 2) {
                                    keep = 1;
                                }
                                if (
                                    keep &&
                                    game.countPlayer(current => {
                                        if (player !== current && current.hp < 3 && player.hp > current.hp && get.attitude(player, current) > 2) {
                                            keep += player.hp - current.hp;
                                            return true;
                                        }
                                        return false;
                                    })
                                ) {
                                    if (keep > 2) {
                                        return 0;
                                    }
                                }
                                return 2;
                            }
                            if (target.isZhu2() || target === game.boss) {
                                return 2;
                            }
                            if (player !== target) {
                                if (target.hp < 0 && taos.length + target.hp <= 0) {
                                    return 0;
                                }
                                if (Math.abs(get.attitude(player, target)) < 1) {
                                    return 0;
                                }
                            }
                            if (!player.getFriends().length) {
                                return 2;
                            }
                            let tri = _status.event.getTrigger(),
                                num = game.countPlayer(current => {
                                    if (get.attitude(current, target) > 0) {
                                        return current.countCards("hs", i => get.name(i) === "tao" && lib.filter.cardEnabled(i, target, "forceEnable"));
                                    }
                                }),
                                dis = 1,
                                t = _status.currentPhase || game.me;
                            while (t !== target) {
                                let att = get.attitude(player, t);
                                if (att < -2) {
                                    dis++;
                                } else if (att < 1) {
                                    dis += 0.45;
                                }
                                t = t.next;
                            }
                            if (mode === "identity") {
                                if (tri && tri.name === "dying") {
                                    if (target.identity === "fan") {
                                        if ((!tri.source && player !== target) || (tri.source && tri.source !== target && player.getFriends().includes(tri.source.identity))) {
                                            if (num > dis || (player === target && player.countCards("hs", { type: "basic" }) > 1.6 * dis)) {
                                                return 2;
                                            }
                                            return 0;
                                        }
                                    } else if (tri.source && tri.source.isZhu && (target.identity === "zhong" || target.identity === "mingzhong") && (tri.source.countCards("he") > 2 || (player === tri.source && player.hasCard(i => i.name !== "tao", "he")))) {
                                        return 2;
                                    }
                                    //if(player!==target&&!target.isZhu&&target.countCards('hs')<dis) return 0;
                                }
                                if (player.identity === "zhu") {
                                    if (
                                        player.hp <= 1 &&
                                        player !== target &&
                                        taos + player.countCards("hs", "jiu") <=
                                            Math.min(
                                                dis,
                                                game.countPlayer(current => {
                                                    return current.identity === "fan";
                                                })
                                            )
                                    ) {
                                        return 0;
                                    }
                                }
                            } else if (mode === "stone" && target.isMin() && player !== target && tri && tri.name === "dying" && player.side === target.side && tri.source !== target.getEnemy()) {
                                return 0;
                            }
                            return 2;
                        },
                    },
                    tag: {
                        recover: 1,
                        save: 1,
                    },
                },
                "_priority": 0,
            },
            "yueyao_extra": {
                trigger: {
                    player: "useCard",
                },
                filter(event, player) {
                      return event.card.name == 'tao';
                  },
                content() {
                      "step 0"
                      const targets = game.filterPlayer(current => {
                          return current.isLinked() || current.isTurnedOver() || current.countMark('kuangluan') > 0;
                      });
                      
                      if (targets.length > 0) {
                          player.chooseTarget('是否选择一名角色，移除其一个负面状态或标记？', function(card, player, target) {
                              return target.isLinked() || target.isTurnedOver() || target.countMark('kuangluan') > 0;
                          }).set('ai', function(target) {
                              const attitude = get.attitude(player, target);
                              if (attitude > 0) {
                                  if (target.countMark('kuangluan') > 0) return 3;
                                  if (target.isLinked()) return 2;
                                  if (target.isTurnedOver()) return 1;
                              }
                              return 0;
                          });
                      }
                      
                      "step 1"
                      if (result.bool && result.targets && result.targets.length > 0) {
                          const target = result.targets[0];
                          const options = [];
                          
                          if (target.countMark('kuangluan') > 0) {
                              options.push('移除狂乱标记');
                          }
                          if (target.isLinked()) {
                              options.push('解除连环');
                          }
                          if (target.isTurnedOver()) {
                              options.push('重置武将牌');
                          }
                          
                          if (options.length > 1) {
                              player.chooseControl(options)
                                  .set('prompt', '选择要移除的负面状态')
                                  .set('ai', function() {
                                      if (options.includes('移除狂乱标记')) return '移除狂乱标记';
                                      if (options.includes('解除连环')) return '解除连环';
                                      return options[0];
                                  });
                          } else if (options.length == 1) {
                              event.directResult = {control: options[0]};
                          }
                          
                          event.target = target;
                      }
                      
                      "step 2"
                      const control = result ? result.control : event.directResult.control;
                      const target = event.target;
                      
                      if (control == '移除狂乱标记') {
                          target.removeMark('kuangluan', 1);
                          if (target.countMark('kuangluan') == 0) {
                              target.removeSkill('kuangluan_mark');
                          }
                          game.log(target, '的狂乱标记被移除');
                      } else if (control == '解除连环') {
                          target.link(false);
                          game.log(target, '解除了连环状态');
                      } else if (control == '重置武将牌') {
                          target.turnOver(false);
                          game.log(target, '重置了武将牌');
                      }
                  },
                "_priority": 0,
            },
            "yueyao_guoshi": {
                enable: "phaseUse",
                limited: true,
                skillAnimation: true,
                animationColor: "wood",
                filterTarget: true,
                content() {
                      "step 0"
                      target.recover(target.maxHp - target.hp);
                      target.draw(4);
                      
                      game.log(target, '回复了所有体力并摸了4张牌');
                      
                      player.awakenSkill('yueyao_guoshi');
                  },
                ai: {
                    order: 1,
                    result: {
                        target(player, target) {
                              if (target.hp < target.maxHp) {
                                  return get.attitude(player, target) * (target.maxHp - target.hp + 2);
                              }
                              return get.attitude(player, target) * 2;
                          },
                    },
                },
                mark: true,
                intro: {
                    content: "limited",
                },
                init: (player, skill) => (player.storage[skill] = false),
                "_priority": 0,
            },
            kuangqizhitong: {
                enable: "phaseUse",
                limited: true,
                skillAnimation: true,
                animationColor: "fire",
                filterTarget(card, player, target) {
                   return target != player;
               },
                selectTarget: -1,
                multitarget: true,
                multiline: true,
                async content(event, trigger, player) {
                   let yongkuangCount = 0;
                   let damageCount = 0;
                   const allTargets = event.targets.slice();
                   
                   // 依次让每个角色选择
                   for (let i = 0; i < allTargets.length; i++) {
                       const target = allTargets[i];
                       const result = await target.chooseControl('获得永狂标记', '对' + get.translation(player) + '使用【杀】')
                           .set('prompt', '狂气之瞳：选择一项')
                           .set('ai', function() {
                               // AI判断：如果有杀且能造成伤害，选择使用杀
                               if (target.countCards('h', 'sha') > 0) {
                                   const effect = get.effect(player, {name: 'sha'}, target);
                                   if (effect > 0) return '对' + get.translation(player) + '使用【杀】';
                               }
                               return '获得永狂标记';
                           })
                           .forResult();
                       
                       if (result.control == '获得永狂标记') {
                           target.addMark('yongkuang', 1);
                           target.addSkill('yongkuang_effect');
                           yongkuangCount++;
                           game.log(target, '获得了永狂标记');
                       } else {
                           // 对玩家使用杀
                           const hasCard = target.countCards('h', 'sha') > 0;
                           if (hasCard) {
                               await target.useCard({name: 'sha'}, player, false);
                           } else {
                               // 没有杀或使用后未造成伤害，失去2点体力
                               await target.loseHp(2);
                               game.log(target, '没有【杀】或使用后未造成伤害，失去了2点体力');
                           }
                       }
                   }
                   
                   // 结算奖励
                   if (yongkuangCount > 0) {
                       await player.draw(yongkuangCount * 2);
                       game.log(player, '因', yongkuangCount, '名角色获得永狂标记，摸了', yongkuangCount * 2, '张牌');
                   }
                   
                   // 获得技能的处理会在伤害事件中触发
                   player.awakenSkill('kuangqizhitong');
               },
                group: "kuangqizhitong_damage",
                mark: true,
                intro: {
                    content: "limited",
                },
                init: (player, skill) => (player.storage[skill] = false),
                "_priority": 0,
            },
            "kuangqizhitong_damage": {
                trigger: {
                    player: "damageEnd",
                },
                filter(event, player) {
                   return event.source && event.source != player && player.hasSkill('kuangqizhitong') && !player.storage.kuangqizhitong_used;
               },
                forced: true,
                async content(event, trigger, player) {
                   const source = trigger.source;
                   const skills = source.getSkills().filter(skill => {
                       const info = get.info(skill);
                       return info && !info.charlotte && skill != 'kuangqizhitong' && skill != 'kuangqizhitong_damage';
                   });
                   
                   if (skills.length > 0) {
                       const result = await player.chooseControl(skills)
                           .set('prompt', '选择获得' + get.translation(source) + '的一个技能')
                           .set('ai', function() {
                               return skills.randomGet();
                           })
                           .forResult();
                       
                       if (result && result.control) {
                           player.addSkill(result.control);
                           game.log(player, '获得了技能', result.control);
                       }
                   }
               },
                "_priority": 0,
            },
            "yongkuang_effect": {
                mod: {
                    cardname(card, player) {
                       return 'sha';
                   },
                },
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                forced: true,
                async content(event, trigger, player) {
                   const handCards = player.getCards('h');
                   const discardNum = Math.ceil(handCards.length / 2);
                   
                   if (discardNum > 0 && handCards.length > 0) {
                       const toDiscard = handCards.randomGets(discardNum);
                       await player.discard(toDiscard);
                       game.log(player, '因永狂标记随机弃置了', toDiscard);
                   }
               },
                mark: true,
                intro: {
                    name: "永狂",
                    content: "你的所有牌视为【杀】，准备阶段随机弃置一半手牌（向上取整）",
                },
                marktext: "狂",
                "_priority": 0,
            },
            tianmiduyao: {
                enable: "phaseUse",
                limited: true,
                skillAnimation: true,
                animationColor: "thunder",
                filter(event, player) {
                      return !player.storage.tianmiduyao && player.countCards('h') > 0;
                  },
                async content(event, trigger, player) {
                      player.storage.tianmiduyao = true;
                      player.awakenSkill('tianmiduyao');
                      
                      // 展示所有手牌
                      const cards = player.getCards('h');
                      await player.showCards(cards, '甜蜜毒药');
                      
                      // 计算黑色牌数量
                      const blackCards = cards.filter(card => get.color(card) == 'black');
                      const blackCount = blackCards.length;
                      
                      game.log(player, `展示了${cards.length}张手牌，其中有${blackCount}张黑色牌`);
                      
                      // 根据黑色牌数量选择角色
                      for (let i = 0; i < blackCount; i++) {
                          const result = await player.chooseTarget(`甜蜜毒药：选择第${i+1}个目标角色`, true)
                              .set('ai', (target) => {
                                  if (target == player) return 0;
                                  if (get.attitude(player, target) >= 0) return 0;
                                  // 优先选择没有中毒标记的敌人（给剧毒）
                                  if (target.countMark('zhongdu') == 0) return -get.attitude(player, target) * 2;
                                  // 其次选择有中毒标记的敌人（直接伤害）
                                  return -get.attitude(player, target);
                              });
                          if (result.bool && result.targets && result.targets.length > 0) {
                              const target = result.targets[0];
                              
                              if (target.countMark('zhongdu') == 0) {
                                  // 没有中毒：获得剧毒标记
                                  target.addMark('judu', 1);
                                  target.addSkill('judu_mark');
                                  game.log(target, '获得了剧毒标记');
                              } else {
                                  // 有中毒：立即失去2点体力，移除中毒
                                  await target.loseHp(2);
                                  target.removeMark('zhongdu', target.countMark('zhongdu'));
                                  if (target.countMark('zhongdu') == 0) {
                                      target.removeSkill('zhongdu_mark');
                                  }
                                  game.log(target, '失去2点体力，移除了中毒标记');
                              }
                          }
                      }
                      
                      // 弃置所有手牌，摸等量牌
                      const handCount = player.countCards('h');
                      if (handCount > 0) {
                          await player.discard(player.getCards('h'));
                          await player.draw(handCount);
                      }
                      
                      // 本回合使用牌无次数限制
                      player.addTempSkill('tianmiduyao_unlimited', 'phaseUseEnd');
                      game.log(player, '本回合使用牌无次数限制');
                  },
                ai: {
                    order: 1,
                    result: {
                        player(player) {
                              const cards = player.getCards('h');
                              const blackCount = cards.filter(card => get.color(card) == 'black').length;
                              const enemies = game.filterPlayer(current => get.attitude(player, current) < 0);
                              if (blackCount >= 2 && enemies.length >= blackCount) return 3;
                              if (blackCount >= 1 && enemies.length >= 1) return 1;
                              return 0;
                          },
                    },
                },
                mark: true,
                intro: {
                    content: "limited",
                },
                init: (player, skill) => (player.storage[skill] = false),
                "_priority": 0,
            },
            "tianmiduyao_unlimited": {
                mod: {
                    cardUsable() {
                          return Infinity;
                      },
                },
                "_priority": 0,
            },
            "judu_mark": {
                trigger: {
                    player: "phaseZhunbeiBegin",
                },
                filter(event, player) {
                      return player.countMark('judu') > 0;
                  },
                forced: true,
                async content(event, trigger, player) {
                      await player.loseHp(2);
                      game.log(player, '因剧毒失去2点体力');
                  },
                mark: true,
                intro: {
                    name: "剧毒",
                    content: "准备阶段失去2点体力，无法被移除",
                },
                marktext: "剧",
                "_priority": 0,
            },
            huashi: {
                locked: true,
                mod: {
                    selectTarget(card, player, range) {
                       if (card.name == 'sha' || card.name == 'juedou') {
                           if (range[1] != -1) range[1] = Math.min(range[1] + 1, 2);
                           else range[1] = 2;
                       }
                   },
                },
                trigger: {
                    target: "shaBegin",
                    player: "phaseDrawBegin",
                },
                filter(event, player, name) {
                   if (name == 'shaBegin') {
                       return event.player != player;
                   }
                   if (name == 'phaseDrawBegin') {
                       return true;
                   }
               },
                async content(event, trigger, player) {
                   if (event.triggername == 'shaBegin') {
                       // 其他角色对你使用【杀】时，你可以弃置一张牌，令其需额外使用一张【杀】
                       const discardResult = await player.chooseToDiscard('he', '是否弃置一张牌，令其需额外使用一张【杀】？')
                           .set('ai', function(card) {
                               const attitude = get.attitude(player, trigger.player);
                               if (attitude < 0) return 8 - get.value(card);
                               return 0;
                           }).forResult();
                       
                       if (discardResult.bool) {
                           const useResult = await trigger.player.chooseToUse({
                               name: 'sha',
                               isCard: true
                           }, '额外使用一张【杀】，否则此【杀】无效').set('ai', function(card) {
                               return get.effect(trigger.target, {name: 'sha'}, trigger.player);
                           }).forResult();
                           
                           if (!useResult.bool) {
                               trigger.cancel();
                               game.log('此【杀】被', player, '的幻视无效化');
                           }
                       }
                   } else if (event.triggername == 'phaseDrawBegin') {
                       // 摸牌阶段，你可以改为观看牌堆顶的四张牌，获得其中两张
                       const choice = await player.chooseControl('正常摸牌', '观看牌堆顶四张牌')
                           .set('prompt', '幻视：选择摸牌方式')
                           .set('ai', function() {
                               return '观看牌堆顶四张牌';
                           }).forResult();
                       
                       if (choice.control == '观看牌堆顶四张牌') {
                           trigger.cancel();
                           const cards = get.cards(4);
                           const cardResult = await player.chooseCardButton(cards, 2, '选择获得两张牌', true)
                               .set('ai', function(button) {
                                   return get.value(button.link);
                               }).forResult();
                           
                           if (cardResult.bool && cardResult.links) {
                               await player.gain(cardResult.links, 'draw');
                               const remaining = cards.filter(card => !cardResult.links.includes(card));
                               if (remaining.length > 0) {
                                   ui.cardPile.insertBefore(remaining[0], ui.cardPile.firstChild);
                                   if (remaining.length > 1) {
                                       ui.cardPile.insertBefore(remaining[1], ui.cardPile.firstChild);
                                   }
                               }
                           }
                       }
                   }
               },
                group: "huanshi_kuangluan",
            },
        },
        translate: {
            lingxian: "铃仙",
            huantong: "幻痛",
            "huantong_info": "出牌阶段，你的摸牌数变为3张；准备阶段，你可以选择一名其他角色，视为对其使用一张【过河拆桥】。",
            "wuyu_molisha": "雾雨魔理沙",
            jiezou: "借走",
            "jiezou_info": "出牌阶段限一次，你可以选择一项：①获得一名其他角色的一张手牌，然后交给其一张牌，②获得一名其他角色装备区的一张牌，若如此做，其摸两张牌，③观看一名其他角色的所有手牌，然后你可以用任意张手牌与其等量交换。通过借走获得的装备牌可以立即使用",
            mopao: "魔炮",
            "mopao_info": "锁定技，你使用【杀】的次数上限+1；你使用的【杀】可以指定任意名角色为目标（至少两名）；当你使用【杀】指定多个目标时，你可以弃置X张牌，令此【杀】造成的伤害+1（X为目标数-1）；你的攻击范围始终+2。",
            xingxie: "星屑",
            "xingxie_info": "摸牌阶段，你可以改为亮出牌堆顶的5张牌，获得其中的锦囊牌和装备牌，其余牌置入弃牌堆；当你使用锦囊牌时，你可以额外指定一个目标（无距离限制）；你使用锦囊牌无次数限制；当你的装备区有3张或更多牌时，你使用牌造成的伤害+1。",
            mofa: "魔法",
            "mofa_info": "觉醒技，准备阶段，若你本局游戏已使用至少8张锦囊牌，你须减1点体力上限并回复所有体力，然后获得技能【极光】和【偷师】。",
            jiguang: "极光",
            "jiguang_info": "你可以将任意张手牌当作【万箭齐发】使用；你使用的群体伤害锦囊额外结算一次；锁定技，你使用锦囊牌时摸一张牌。",
            toushi: "偷师",
            "toushi_info": "任意时机下，当有其他角色使用任意锦囊牌，你可以立即获得一张该锦囊的复制且立即打出。",
            lianfu: "恋符",
            "lianfu_info": "限定技，出牌阶段，你可以选择一项：①【主火花】：弃置所有手牌（至少3张），对你攻击范围内的所有角色造成X点伤害（X为弃置牌数的一半，向上取整，最多为3）；②【终极火花】：弃置你装备区的所有牌，然后摸等量的牌，视为使用X张【杀】（X为弃置的装备数+1），这些【杀】不计入次数限制；③【偷走技能】：选择一名其他角色，永久获得其一个非锁定技、非觉醒技、非限定技的技能，然后该角色摸三张牌。",
            ailisi: "爱丽丝·玛格特罗伊德",
            renoucaoyan: "人偶操演",
            "renoucaoyan_info": "锁定技，游戏开始时，你获得3个“人偶”标记（最多7个）。摸牌阶段，你额外摸X张牌（X为“人偶”标记数的一半，向下取整）。你可以将“人偶”标记当作手牌使用或打出：1个人偶=【闪】，2个人偶=【杀】，3个人偶=【无懈可击】。",
            mofu: "魔符",
            "mofu_info": "出牌阶段，你可以弃置一张牌并选择一项（每项每回合限一次）：【上海人偶】获得2个“人偶”标记，然后你可以将一个“人偶”标记置于一名其他角色的武将牌旁，称为“守护人偶”；【蓬莱人偶】将一张手牌当作任意基本牌或非延时锦囊牌使用，若此牌为装备牌，使用后获得1个“人偶”标记；【法兰西人偶】移除1个“人偶”标记，令有守护人偶的角色进入一个额外的出牌阶段（由你操控）。",
            qise: "七色",
            "qise_info": "当其他角色使用牌指定有“守护人偶”的角色为目标时，你可以移除该“守护人偶”，取消此目标。有“守护人偶”的角色摸牌阶段额外摸一张牌。回合结束时，若场上有至少2个“守护人偶”，你获得1个“人偶”标记。你的“人偶”标记不会因使用装备牌而移除。",
            "shouhu_renou": "守护人偶",
            "shouhu_renou_info": "拥有守护人偶标记。",
            renoushi: "人偶师",
            "renoushi_info": "觉醒技。准备阶段，若你拥有7个“人偶”标记，你须减1点体力上限并回复1点体力，获得技能【千线】和【剧场】。",
            qianxian: "千线",
            "qianxian_info": "你使用牌可以额外指定X个目标（X为你的“人偶”标记数-4）。你的“人偶”标记可以当作任意基本牌使用。",
            juchang: "剧场",
            "juchang_info": "出牌阶段限一次，你可以移除所有“守护人偶”，视为这些角色依次对你指定的目标使用一张【杀】。当有“守护人偶”的角色受到伤害时，你可以移除1个“人偶”标记，防止此伤害。",
            geliya: "歌莉娅",
            "geliya_info": "限定技。出牌阶段，你可以展示并移除所有“人偶”标记（至少4个），选择一项：【人偶军团】获得X个歌莉娅人偶，每两个标记可抵挡一次伤害，X回合后可分配剩余标记数的杀；【完美操控】获得至多X/2名角色的所有手牌并重新分配；【魔彩光】对所有其他角色造成1点伤害，并为每名角色创建守护人偶。",
            "geliya_legion_control": "歌莉娅军团控制",
            "geliya_legion_control_info": "锁定技，每个回合开始时，检查并管理歌莉娅人偶的状态。",
            "geliya_puppet_marks": "人偶标记",
            "geliya_puppet_marks_info": "歌莉娅人偶，每两个标记可抵挡一次伤害。",
            "geliya_puppet_defense": "人偶护盾",
            "geliya_puppet_defense_info": "当你受到伤害时，你可以消耗2个歌莉娅人偶，抵挡此次伤害。",
            "geliya_puppet_countdown": "人偶倒计时",
            "geliya_puppet_countdown_info": "锁定技，回合开始时，歌莉娅人偶标记倒计时减1。当倒计时结束时，你可以分配剩余标记数的【杀】。",
            "geliya_puppet_attack_distribution": "人偶分配",
            "geliya_puppet_attack_distribution_info": "出牌阶段限一次，你可以选择任意数量的角色，分配剩余歌莉娅人偶数的【杀】并对选中的角色使用这些【杀】。",
            "geliya_puppet": "歌莉娅人偶",
            "geliya_puppet_ab": "人偶",
            "mini_bagua_furnace": "迷你八卦炉",
            "mini_bagua_furnace_info": "当你使用【杀】指定目标后，你可以弃置一张手牌，令此【杀】不可被【闪】响应，且伤害+1。",
            "magic_collection": "魔力收集",
            "magic_collection_info": "每当你造成1点伤害后，你可以摸一张牌（每回合限一次）。",
            "puppet_guard": "守护",
            "puppet_guard_info": "当你成为【杀】或【决斗】的目标时，你可以弃置一张手牌，视为使用一张【闪】或打出一张【杀】。",
            "puppet_performance": "人偶操演",
            "puppet_performance_info": "出牌阶段限一次，你可以将一张手牌当作【杀】对与你距离为1的角色使用。若如此做，此【杀】结算后，你摸一张牌。",
            "geliya_puppet_prefix": "东方",
            "zhongdu_mark": "中毒",
            "zhongdu_mark_info": "锁定技，准备阶段，你失去1点体力；当你使用【桃】时，你需额外弃置一张牌。",
            dufu: "毒符",
            "dufu_info": "出牌阶段限两次，你可以将手牌按以下方式使用：红色牌当作【酒】使用，然后目标获得“中毒”标记；黑色牌当作【兵粮寸断】使用，若目标有“中毒”标记，你摸一张牌；装备牌当作【杀】使用，此【杀】造成伤害后，目标获得“中毒”标记。",
            linglan: "铃兰",
            "linglan_info": "锁定技，你对有“中毒”标记的角色造成的伤害+1；当其他角色因“中毒”失去体力时，你摸一张牌；你的回合开始时，你选择一名角色获得“中毒”标记；拥有“中毒”标记的角色与你计算距离时+1；你免疫“中毒”效果，当你成为【酒】的目标时，改为回复1点体力。",
            renou: "人偶",
            "renou_info": "你没有装备区，当你获得装备牌时，你可以选择：将其当作【杀】对一名有“中毒”标记的角色使用，或弃置之并令一名角色获得“中毒”标记；当你受到无属性伤害时，你可以弃置一张黑色牌令此伤害-1；当你成为【乐不思蜀】或【兵粮寸断】的目标时，使用者获得“中毒”标记。",
            jiefang: "解放",
            "jiefang_info": "觉醒技，准备阶段，若场上“中毒”标记总数不少于5个，你减1点体力上限，获得技能【毒雾】和【苏生】。",
            duwu: "毒雾",
            "duwu_info": "锁定技，你的回合开始时，所有其他角色须选择：弃置一张红色牌，或获得“中毒”标记；出牌阶段限一次，你可以移除一名角色的所有“中毒”标记，对其造成X点伤害（X为移除的标记数）。",
            susheng: "苏生",
            "susheng_info": "当有角色死亡时，若其有”中毒“标记，你可以弃置所有手牌（至少两张），令其复活并将体力回复至1点；以此法复活的角色获得“人偶”标记：无法回复体力，受你控制进行回合。",
            tianmiduyao: "甜蜜毒药",
            "tianmiduyao_info": "限定技，出牌阶段，你可以展示所有手牌，每有一张黑色牌，你选择一名角色，执行以下效果：若该角色没有“中毒”，其获得“剧毒”标记（准备阶段失去2点体力，无法被移除）；若该角色有“中毒”，其立即失去2点体力，然后移除“中毒”标记；然后你弃置所有手牌，摸等量的牌，本回合你使用牌无次数限制。",
            "judu_mark": "剧毒",
            "judu_mark_info": "锁定技，准备阶段，你失去2点体力。此标记无法被移除。",
            "renou_puppet_effect": "人偶",
            "renou_puppet_effect_info": "锁定技，你无法回复体力，你的回合由梅蒂欣控制。",
            kuangbo: "狂波",
            "kuangbo_info": "出牌阶段，你可以展示一张手牌并选择一名其他角色：红色牌：该角色选择一项：1.弃置两张牌；2.将武将牌翻面；黑色牌：该角色选择一项：1.本回合不能使用【杀】；2.展示所有手牌，你选择其中一张获得；点数大于10：该角色获得”狂乱“标记。",
            yuetu: "月兔",
            "yuetu_info": "当你成为【杀】或锦囊牌的目标时，你可以进行判定：红桃：此牌对你无效，使用者获得“狂乱”标记；方块：你摸两张牌；其他：你可以弃置一张牌移动到其他位置；你每回合首次受到伤害时，防止此伤害，改为失去等量的手牌；你的手牌上限+X（X为场上”狂乱“标记数）。",
            yaoshi: "药师",
            "yaoshi_info": "觉醒技，准备阶段，若你累计发动”狂波“不少于7次，你须加1点体力上限，获得技能【波长】和【月药】。",
            "kuangluan_mark": "狂乱",
            "kuangluan_mark_info": "使用牌时需先展示，其他角色可以弃置相同花色的牌令此牌无效。每回合限两次。",
            kuangqizhitong: "狂气之瞳",
            "kuangqizhitong_info": "限定技，出牌阶段，你可以选择所有其他角色，令其依次选择：获得”永狂“标记（该角色的所有牌视为【杀】，准备阶段随机弃置一半手牌向上取整）；或立即对你使用一张【杀】（无距离限制），若没有或使用后未造成伤害，其失去2点体力。执行完毕后，每有一名角色获得”永狂“标记，你摸两张牌；每有一名角色对你造成伤害，你获得其一个技能直到游戏结束。",
            "yongkuang_effect": "永狂",
            "yongkuang_effect_info": "你的所有牌视为【杀】，准备阶段随机弃置一半手牌（向上取整）。",
            huashi: "幻视",
            "huashi_info": "锁定技，你的【杀】和【决斗】可以指定至多两名角色；当其他角色对你使用【杀】时，你可以弃置一张牌，令其需额外使用一张【杀】，否则此【杀】无效；摸牌阶段，你可以改为观看牌堆顶的四张牌，获得其中两张，其余放回牌堆顶；拥有“狂乱”标记的角色对你使用牌时，你摸一张牌。",
        },
        connect: true,
    },
    intro: "",
    author: "无名玩家",
    diskURL: "",
    forumURL: "",
    version: "1.0",
},files:{"character":["Marisa.jpg","Alice.jpg","reisen.jpg","medixin.jpg"],"card":[],"skill":[],"audio":[]},connect:false} 
};