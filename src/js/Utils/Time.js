export default class Time
{
    /**
     * Constructor
     */
    constructor()
    {
        this.start = Date.now()
        this.current = this.start
        this.elapsed = 0
        this.delta = 16

        this.tick = this.tick.bind(this)
    }

    /**
     * Tick
     */
    tick()
    {
        this.ticker = window.requestAnimationFrame(this.tick)

        const current = Date.now()

        this.delta = current - this.current
        this.elapsed = current - this.start
        this.current = current

        if(this.delta > 60)
        {
            this.delta = 60
        }

        world.step(1/60, this.delta, 3)
        eventHandler.trigger('tick')
        renderer.render(scene, camera.instance)
    }

    /**
     * Stop
     */
    stop()
    {
        window.cancelAnimationFrame(this.ticker)
    }
}
