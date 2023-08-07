/*
    Data:
        id: string; <- auto
        createdAt: Date; <- auto
        updatedAt: Date; <- auto
        expiresAt: Date; <- auto
        handle: string; <- gen by hash
        userId: string; <- get by user
        user: User;
        ip: string; <- get from request
        userAgent: string; <- get from request
    
*/ 

const SessionRepository = require("../dbacess/session");
const { generateToken } = require("./genhash");

async function createSession(user, ip, userAgent) {
    const sessionRepository = new SessionRepository();
    const handle = generateToken();
    const session = await sessionRepository.create({
        userId: user.id,
        handle: handle,
        ip,
        userAgent,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });
    return session;
}

module.exports = createSession;