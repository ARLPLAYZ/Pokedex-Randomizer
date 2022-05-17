exports.bug = {
    weak: ['fire', 'flying', 'rock'],
    res: ['fighting', 'grass', 'ground'],
    imm: []
}
exports.fairy = {
    weak: ['poison', 'steel'],
    res: ['bug', 'dark', 'fighting'],
    imm: []
}

exports.fire = {
    weak: ['ground', 'rock','water'],
    res: ['bug','fairy', 'grass','fire','ice','steel'],
    imm: []
}

exports.ice = {
    weak: ['fire', 'fighting', 'rock', 'steel'],
    res: ['ice'],
    imm: []
}
exports.grass = {
    weak: ['bug', 'fire', 'flying', 'ice', 'poison'],
    res: ['electric', 'grass', 'ground', 'water'],
    imm: []
}
exports.steel = {
    weak: ['fighting', 'fire','ground'],
    res: ['bug', 'dragon', 'fairy', 'flying', 'grass', 'ice', 'normal', 'psychic', 'rock', 'steel'],
    imm: ['poison']   
}
exports.water = {
    weak: ['electric', 'grass'],
    res: ['fire', 'ice', 'steel', 'water'],
    imm: []   
    
}
exports.normal = {
    weak: ['fighting'],
    res: [],
    imm: ['ghost']   
    
}
exports.fighting = {
    weak: ['fairy', 'flying', 'psychic'],
    res: ['bug', 'dark', 'rock'],
    imm: []   
    
}
exports.dark = {
    weak: ['bug', 'fairy', 'fighting'],
    res: ['dark', 'ghost'],
    imm: ['psychic']   
}
exports.psychic = {
    weak: ['bug','dark', 'ghost'],
    res: ['fighting', 'psychic'],
    imm: []   
}
exports.ghost = {
    weak: ['dark', 'ghost'],
    res: ['bug', 'poison'],
    imm: ['fighting', 'normal']    
}
exports.electric = {
    weak: ['ground'],
    res: ['elctric','flying', 'steel'],
    imm: []    
}
exports.flying = {
    weak: ['electric', 'ice', 'rock'],
    res: ['bug', 'fighting', 'grass'],
    imm: ['ground']    
}
exports.dragon = {
    weak: ['dragon', 'fairy', 'ice'],
    res: ['fire', 'electric', 'grass', 'water'],
    imm: []
}
exports.ground = {
    weak: ['grass', 'ice', 'water'],
    res: ['poison', 'rock'],
    imm: ['electric']
}
exports.rock = {
    weak: ['fighting', 'grass', 'ground', 'steel', 'water'],
    res: ['fire', 'flying', 'normal', 'poison'],
    imm: []
}

exports.poison = {
    weak: ['ground', 'psychic'],
    res: ['bug','fairy','fighting', 'grass', 'poison'],
    imm: []
}

// bug, fairy, fire, ice, grass, steel, water, normal, fighting, pyshcic , dark, ghost, elec, flying
