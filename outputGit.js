const fs = require('fs')
const shell = require('shelljs')


function getLog() {
    let _cmd = `git log \
  --date=iso --pretty=format:'{"commit": "%h","author": "%aN <%aE>","date": "%ad","message": "%s"},' \
  $@ | \
  perl -pe 'BEGIN{print "["}; END{print "]\n"}' | \
  perl -pe 's/},]/}]/'`

    return new Promise((resolve, reject) => {
        shell.exec(_cmd2, (code, stdout, stderr) => {
            if (code) {
                reject(stderr)
            } else {
                let res = JSON.parse(stdout)
                res = handle(res)
                resolve(res)
            }
        })
    })
}

function getBranch() {
    let _cmd = `git branch`

    return new Promise((resolve, reject) => {
        shell.exec(_cmd, (code, stdout, stderr) => {
            if (code) {
                reject(stderr)
            } else {
                console.log('stdout', stdout);
                resolve(stdout)
            }
        })
    })
}

async function getCommits() {
    let _gitLog = await getLog()
    let str = JSON.stringify(_gitLog, "", "\t")

    fs.writeFile('data.json', str, function (err) {
        if (err) { res.status(500).send('Server is error...') }

    })
}

async function getBranches() {
    let _gitLog = await getLog()
    console.log(_gitLog)

    let arr = _gitLog.split("\n") // 将本地分支字符串信息分割为数组
    console.log(arr)
}


function handle(arr) {
    return arr.filter(item => {
        return item.message.indexOf('git') !== -1
    })
}

commit()

