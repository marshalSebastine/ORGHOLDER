const dbconfig = Object.freeze({
    dbname: "orgholderdb",
    orgcollectionname: "organizations",
    usercollectioname: "users",
    connectionurl: process.env.DBURL
});

module.exports  = dbconfig;