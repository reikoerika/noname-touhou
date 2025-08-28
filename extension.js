import { lib, game, ui, get, ai, _status } from "../../noname.js";
export const type = "extension";
export default function(){
	return {name:"东方乱斗谈",arenaReady:function(){
    
},content:function(config,pack){
    
},prepare:function(){
    
},precontent:function(){
    
},config:{},help:{},package:{
    character: {
        character: {
            "lingxian": {
                sex: "female",
                group: "qun",
                hp: 3,
                skills: ["huantong"]
            },
            "Marisa": {
                sex: "female",
                group: "qun",
                hp: 3,
                skills: ["jiezou", "mopao", "xingxie", "mofa", "lianfu"],
            },
            "Alice": {
                sex: "female",
                group: "qun",
                hp: 3,
                skills: ["renoucaoyan", "mofu", "qise", "renoushi", "geliya"],
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
                 showCharacter: true
             }
        },
        translate: {
            "lingxian": "铃仙",
            "lingxian_prefix": "东方",
            "Marisa": "雾雨魔理沙",
            "Marisa_prefix": "东方",
            "Alice": "爱丽丝·玛格特罗伊德",
            "Alice_prefix": "东方",
            "geliya_puppet": "歌莉娅人偶",
            "geliya_puppet_prefix": "东方"
        },
        connect: true
    },
    card: {
        card: {
            // 八卦炉 - 宝物装备
            "bagua_furnace": {
                type: "equip",
                subtype: "equip5",  // 宝物
                enable: true,
                skills: ["mini_bagua_furnace", "magic_collection"],
                ai: {
                    basic: {
                        equipValue: 7,
                        order: 9
                    }
                }
            },
            
            // 蓬莱人偶 - 宝物装备
            "penglai_puppet": {
                type: "equip",
                subtype: "equip5",  // 宝物
                enable: true,
                skills: ["puppet_guard", "puppet_performance"],
                ai: {
                    basic: {
                        equipValue: 6,
                        order: 9
                    }
                }
            }
        },
        translate: {
            "bagua_furnace": "八卦炉",
            "bagua_furnace_info": "装备牌-宝物<br><b>迷你八卦炉</b>：当你使用【杀】指定目标后，你可以弃置一张手牌，令此【杀】不可被【闪】响应，且伤害+1。<br><b>魔力收集</b>：每当你造成1点伤害后，你可以摸一张牌（每回合限一次）。",
            
            "penglai_puppet": "蓬莱人偶",
            "penglai_puppet_info": "装备牌-宝物<br><b>守护</b>：当你成为【杀】或【决斗】的目标时，你可以弃置一张手牌，视为使用一张【闪】或打出一张【杀】。<br><b>人偶操演</b>：出牌阶段限一次，你可以将一张手牌当作【杀】对与你距离为1的角色使用。若如此做，此【杀】结算后，你摸一张牌。"
        },
        list: [],
        connect: true
    },
    skill: {
        skill: {
            "renoucaoyan": {
                audio: 2,
                trigger: {
                    global: "gameStart",
                    player: "phaseDrawBegin"
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
                    }
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
                            }
                        },
                        ai: {
                            order: function() {
                                return 10;
                            },
                            result: {
                                player: 1
                            }
                        }
                    }
                }
            },
            "mofu": {
                audio: 2,
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
                group: ["mofu_clear", "mofu_falanxi_direct"],
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
                    }
                },
                ai: {
                    order: 8,
                    result: {
                        player: 1
                    }
                },
                subSkill: {
                    clear: {
                        trigger: {
                            player: "phaseJieshuBegin"
                        },
                        forced: true,
                        popup: false,
                        async content(event, trigger, player) {
                            delete player.storage.mofu_shanghai;
                            delete player.storage.mofu_penglai;
                            delete player.storage.mofu_falanxi;
                        }
                    },
                    falanxi_direct: {
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
                                player: 1
                            }
                        }
                    }
                }
            },
            "shouhu_renou": {
                mark: true,
                intro: {
                    name: "守护人偶",
                    content: "拥有守护人偶"
                },
                marktext: "守"
            },
            "qise": {
                audio: 2,
                trigger: {
                    global: ["useCardToTargeted", "phaseDrawBegin", "phaseEnd"]
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
                    threaten: 1.5
                },
                subSkill: {
                    equip: {
                        trigger: {
                            player: "useCard"
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
                        }
                    }
                }
            },
            "huantong": {
                audio: 2,
                trigger: {
                    player: ["phaseDrawBegin", "phaseZhunbeiBegin"]
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
                    threaten: 1.5
                }
            },
            renoushi: {
                audio: "ext:东方project/renoushi.mp3",
                trigger: {
                    player: "phaseZhunbeiBegin"
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
                derivation: ["qianxian", "juchang"]
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
                    }
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
                    }
                },
                ai: {
                    order: 10,
                    result: {
                        player: 1
                    }
                }
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
                        }
                    }
                }
            },
            juchang_damage: {
                audio: false,
                trigger: {
                    global: "damageBegin4"
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
                }
            },
            jiezou: {
                audio: 2,
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
                         target: -1
                     }
                 }
             },
             "mopao": {
                 audio: 2,
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
                    }
                 },
                 trigger: {
                     player: "useCard"
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
                     threaten: 2
                 }
             },
             "xingxie": {
                 audio: 2,
                 trigger: {
                     player: "phaseDrawBegin"
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
                     }
                 },
                 trigger2: {
                     source: "damageBegin1"
                 },
                 filter2(event, player) {
                     return player.countCards('e') >= 3;
                 },
                 async content2(event, trigger, player) {
                     trigger.num++;
                     player.logSkill('xingxie');
                 },
                 ai: {
                     threaten: 1.5
                 }
             },
             "mofa": {
                 audio: 2,
                 skillAnimation: true,
                 animationColor: 'thunder',
                 unique: true,
                 limited: true,
                 trigger: {
                     player: "phaseZhunbeiBegin"
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
                 derivation: ['jiguang', 'toushi']
             },
             "jiguang": {
                 audio: 2,
                 enable: "chooseToUse",
                 filterCard: true,
                 selectCard: [1, Infinity],
                 viewAs: {
                     name: "wanjian"
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
                     player: "useCard"
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
                 trigger2: {
                     player: "useCard"
                 },
                 filter2(event, player) {
                     return get.type(event.card) == 'trick';
                 },
                 forced: true,
                 async content2(event, trigger, player) {
                     player.draw();
                 },
                 ai: {
                     order: 1,
                     result: {
                         target: function(player, target) {
                             if (target.countCards('shan') == 0) return -1.5;
                             return -0.5;
                         }
                     }
                 }
             },
             "toushi": {
                 audio: 2,
                 trigger: {
                     global: "useCard"
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
                     threaten: 1.2
                 }
             },
             "lianfu": {
                 audio: 2,
                 enable: "phaseUse",
                 limited: true,
                 skillAnimation: true,
                 animationColor: 'fire',
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
                             let target = await player.chooseTarget('选择一名其他角色', true, function(card, player, target) {
                                 return target != player;
                             }).forResultTarget();
                             if (target) {
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
                         player: 1
                     }
                 }
             },
             "geliya": {
                 audio: 2,
                 enable: "phaseUse",
                 limited: true,
                 skillAnimation: true,
                 animationColor: 'gold',
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
                         player: 1
                     }
                 }
             },
             "geliya_legion_control": {
                 trigger: {
                     player: "phaseBegin"
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
                 }
             },
             "geliya_puppet_marks": {
                 marktext: "人偶",
                 intro: {
                     name: "歌莉娅人偶",
                     content: function(storage, player) {
                         return "当前拥有" + (player.storage.geliya_puppet_marks || 0) + "个歌莉娅人偶。每两个标记可抵挡一次伤害。";
                     }
                 }
             },
             "geliya_puppet_defense": {
                 trigger: {
                     player: "damageBegin3"
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
                         }
                     }
                 }
             },
             "geliya_puppet_countdown": {
                 trigger: {
                     player: "phaseBegin"
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
                 }
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
                         player: 1
                     }
                 }
             },
             
             // 迷你八卦炉技能
             "mini_bagua_furnace": {
                 trigger: {
                     player: "useCardToTargeted"
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
                         player: 1
                     }
                 }
             },
             
             // 魔力收集技能
             "magic_collection": {
                 trigger: {
                     source: "damageSource"
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
                         player: 1
                     }
                 }
             },
             
             // 魔力收集每回合限一次标记
             "magic_collection_used": {
                 charlotte: true
             },
             
             // 守护技能
             "puppet_guard": {
                 trigger: {
                     target: ["useCardToTarget"]
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
                         target: 2
                     }
                 }
             },
             
             // 人偶操演技能
             "puppet_performance": {
                 enable: "phaseUse",
                 usable: 1,
                 filterCard: true,
                 selectCard: 1,
                 position: "h",
                 viewAs: {name: "sha"},
                 filterTarget(card, player, target) {
                     return get.distance(player, target) <= 1 && target != player;
                 },
                 ai: {
                     order: 3,
                     result: {
                         target: -1.5
                     }
                 },
                 group: "puppet_performance_draw"
             },
             
             // 人偶操演摸牌效果
             "puppet_performance_draw": {
                 trigger: {
                     player: "useCardAfter"
                 },
                 filter(event, player) {
                     return event.skill == 'puppet_performance';
                 },
                 forced: true,
                 async content(event, trigger, player) {
                     await player.draw();
                 }
             }
        },
        translate: {
            "lingxian": "铃仙",
            "huantong": "幻痛",
            "huantong_info": "出牌阶段，你的摸牌数变为3张；准备阶段，你可以选择一名其他角色，视为对其使用一张【过河拆桥】。",
            "wuyu_molisha": "雾雨魔理沙",
            "jiezou": "借走",
            "jiezou_info": "出牌阶段限一次，你可以选择一项：①获得一名其他角色的一张手牌，然后交给其一张牌，②获得一名其他角色装备区的一张牌，若如此做，其摸两张牌，③观看一名其他角色的所有手牌，然后你可以用任意张手牌与其等量交换。通过借走获得的装备牌可以立即使用",
            "mopao": "魔炮",
            "mopao_info": "锁定技，你使用【杀】的次数上限+1；你使用的【杀】可以指定任意名角色为目标（至少两名）；当你使用【杀】指定多个目标时，你可以弃置X张牌，令此【杀】造成的伤害+1（X为目标数-1）；你的攻击范围始终+2。",
            "xingxie": "星屑",
            "xingxie_info": "摸牌阶段，你可以改为亮出牌堆顶的5张牌，获得其中的锦囊牌和装备牌，其余牌置入弃牌堆；当你使用锦囊牌时，你可以额外指定一个目标（无距离限制）；你使用锦囊牌无次数限制；当你的装备区有3张或更多牌时，你使用牌造成的伤害+1。",
            "mofa": "魔法",
            "mofa_info": "觉醒技，准备阶段，若你本局游戏已使用至少8张锦囊牌，你须减1点体力上限并回复所有体力，然后获得技能【极光】和【偷师】。",
            "jiguang": "极光",
            "jiguang_info": "你可以将任意张手牌当作【万箭齐发】使用；你使用的群体伤害锦囊额外结算一次；锁定技，你使用锦囊牌时摸一张牌。",
            "toushi": "偷师",
            "toushi_info": "任意时机下，当有其他角色使用任意锦囊牌，你可以立即获得一张该锦囊的复制且立即打出。",
            "lianfu": "恋符",
            "lianfu_info": "限定技，出牌阶段，你可以选择一项：①【主火花】：弃置所有手牌（至少3张），对你攻击范围内的所有角色造成X点伤害（X为弃置牌数的一半，向上取整，最多为3）；②【终极火花】：弃置你装备区的所有牌，然后摸等量的牌，视为使用X张【杀】（X为弃置的装备数+1），这些【杀】不计入次数限制；③【偷走技能】：选择一名其他角色，永久获得其一个非锁定技、非觉醒技、非限定技的技能，然后该角色摸三张牌。",
            "ailisi": "爱丽丝·玛格特罗伊德",
            "renoucaoyan": "人偶操演",
            "renoucaoyan_info": "锁定技，游戏开始时，你获得3个“人偶”标记（最多7个）。摸牌阶段，你额外摸X张牌（X为“人偶”标记数的一半，向下取整）。你可以将“人偶”标记当作手牌使用或打出：1个人偶=【闪】，2个人偶=【杀】，3个人偶=【无懈可击】。",
            "mofu": "魔符",
            "mofu_info": "出牌阶段，你可以弃置一张牌并选择一项（每项每回合限一次）：【上海人偶】获得2个“人偶”标记，然后你可以将一个“人偶”标记置于一名其他角色的武将牌旁，称为“守护人偶”；【蓬莱人偶】将一张手牌当作任意基本牌或非延时锦囊牌使用，若此牌为装备牌，使用后获得1个“人偶”标记；【法兰西人偶】移除1个“人偶”标记，令有守护人偶的角色进入一个额外的出牌阶段（由你操控）。",
            "qise": "七色",
            "qise_info": "当其他角色使用牌指定有“守护人偶”的角色为目标时，你可以移除该“守护人偶”，取消此目标。有“守护人偶”的角色摸牌阶段额外摸一张牌。回合结束时，若场上有至少2个“守护人偶”，你获得1个“人偶”标记。你的“人偶”标记不会因使用装备牌而移除。",
            "shouhu_renou": "守护人偶",
            "shouhu_renou_info": "拥有守护人偶标记。",
            "renoushi": "人偶师",
            "renoushi_info": "觉醒技。准备阶段，若你拥有7个“人偶”标记，你须减1点体力上限并回复1点体力，获得技能【千线】和【剧场】。",
            "qianxian": "千线",
            "qianxian_info": "你使用牌可以额外指定X个目标（X为你的“人偶”标记数-4）。你的“人偶”标记可以当作任意基本牌使用。",        
            "juchang": "剧场",
            "juchang_info": "出牌阶段限一次，你可以移除所有“守护人偶”，视为这些角色依次对你指定的目标使用一张【杀】。当有“守护人偶”的角色受到伤害时，你可以移除1个“人偶”标记，防止此伤害。",
            "geliya": "歌莉娅", 
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
            "geliya_puppet_prefix": "东方"
        },
        connect: true
    },

    intro: "",
    author: "无名玩家",
    diskURL: "",
    forumURL: "",
    version: "1.0",
},files:{"character":["Marisa.png","Alice.jpg"],"card":[],"skill":[],"audio":[]},connect:true} 
};