const fs = require('fs')
const shell = require('shelljs')


function getLog() {
    let _cmd = `git log \
  --date=iso --pretty=format:'{"commit": "%h","author": "%aN <%aE>","date": "%ad","message": "%s"},' \
  $@ | \
  perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
  perl -pe 's/},]/}]/'`

//let _cmd = `git log -i --grep="加gitignore文件"`

    return new Promise((resolve, reject) => {
        shell.exec(_cmd, (code, stdout, stderr) => {
            if (code) {
                reject(stderr)
            } else {
                //let res = JSON.parse(stdout)
                console.log(stdout);
                // res = handle(res)
                // resolve(res)
            }
        })
    })
}


async function getCommits() {
    let _gitLog = await getLog()
    console.log(_gitLog);
    let str = JSON.stringify(_gitLog, "", "\t")

    fs.writeFile('data.json', str, function (err) {
        if (err) { res.status(500).send('Server is error...') }

    })
}


function handle(arr) {
    return arr.filter(item => {
        return item.message.indexOf('git') !== -1
    })
}

getCommits()

