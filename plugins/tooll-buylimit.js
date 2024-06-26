const xpperlimit = 1824
let handler = async (m, {
    conn,
    command,
    args
}) => {
    let count = command.replace(/^buy/i, '')
    count = count ? /all/i.test(count) ? Math.floor(global.db.data.users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
    count = Math.max(1, count)
    if (isNaN(count)) throw `Ex : /buy5`
    if (global.db.data.users[m.sender].exp >= xpperlimit * count) {
        global.db.data.users[m.sender].exp -= xpperlimit * count
        global.db.data.users[m.sender].limit += count
        conn.reply(m.chat, `-${xpperlimit * count} XP\n+ ${count} Limit`, m)
    } else conn.reply(m.chat, `XP tidak mencukupi untuk membeli ${count} limit`, m)
}
handler.help = ['buylimit', 'buylimit', 'buylimitall'].map(v => v + ' <total>')
handler.tags = ['xp']
handler.command = /^buy([0-9]+)|buy|buylimitall$/i
handler.owner = false

export default handler