const CULC = {
    culc: "N/A",
    crc: "W",
    scheller: "E",
    coc: "N",
    bobbyDodd: "SE",
    mccamish: "NE"
}

const CRC = {
    crc: "N/A",
    culc: "E",
    scheller: "E",
    coc: "E",
    bobbyDodd: "E",
    mccamish: "NE"
} 

const SCHELLER = {
    scheller: "N/A",
    culc: "W",
    crc : "w",
    coc : "W",
    bobbyDodd: "SW",
    mccamish: "NW"
}

const COC = {
    coc: "N/A",
    culc: "S",
    crc: "SW",
    scheller: "E",
    bobbyDodd: "SE",
    mccamish: "NE"
}

const BOBBYDODD = {
    bobbyDodd: "N/A",
    culc: "NW",
    crc: "W",
    scheller: "NE",
    coc: "NW",
    mccamish: "N"
}

const MCCAMISH = {
    mccamish: "N/A",
    culc: "SW",
    crc: "SW",
    scheller: "SE",
    bobbyDodd: "S",
    coc: "SW"
}

const places = [CULC, CRC, SCHELLER, COC, BOBBYDODD, MCCAMISH];

export default places;