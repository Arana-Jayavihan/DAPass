export const initVaultsParser = (vaults) => {
    let vaultArr = []
    for (let i = 0; i < vaults.length; i++) {
        let vaultObj = {}
        vaultObj['vaultIndex'] = parseInt(vaults[i][0].hex)
        vaultObj['vaultName'] = vaults[i][1]
        vaultObj['desctiption'] = vaults[i][2]
        vaultArr.push(vaultObj)
    }
    return vaultArr
}