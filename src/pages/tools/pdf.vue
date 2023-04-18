<template>
    <div>
        <canvas ref="pdfCanvas" id="pdfCanvas"></canvas>
        <div>Page {{currentPage}} of {{numPages}}</div>
        <el-button-group>
            <el-button type="primary" size="mini" round  @click="onPrevPage">上一页</el-button>
            <el-button type="primary" size="mini" round @click="onNextPage">下一页</el-button>
        </el-button-group>
    </div>
</template>

<script>
let PDFLIB = require('pdfjs-dist')
PDFLIB.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry.js')

export default {
    data() {
        return {
            pdfDoc: null,
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            canvas: null,
            ctx: null,
            numPages: null,
            currentPage: 1
    }
    },
    mounted() {
        this.canvas = this.$refs.pdfCanvas
        this.ctx = this.canvas.getContext('2d')
       // this.renderPage(this.pageNum)
    },
    methods: {
        renderPage(num) {
            this.pageRendering = true
            this.pdfDoc.getPage(num).then(page => {
                let dpr = window.devicePixelRatio || 1;
                let bsr =
                    this.ctx.webkitBackingStorePixelRatio ||
                    this.ctx.mozBackingStorePixelRatio ||
                    this.ctx.msBackingStorePixelRatio ||
                    this.ctx.oBackingStorePixelRatio ||
                    this.ctx.backingStorePixelRatio ||
                    1;
                let viewport = page.getViewport({scale:screen.availWidth / page.getViewport({scale:1.0}).width});//这是让pdf文件的大小等于视口的大小
                let ratio = dpr / bsr;
                this.canvas.width = viewport.width  * ratio;
                this.canvas.height = viewport.height * ratio; //这里会进行压缩，解决模糊问题
                this.canvas.style.width =window.innerWidth + "px";
                this.canvas.style.height = window.innerWidth * viewport.height / viewport.width  + "px";
                this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
                const renderContext = {
                    canvasContext: this.ctx,
                    viewport: viewport
                }
                const renderTask = page.render(renderContext)

                renderTask.promise.then(() => {
                    this.pageRendering = false
                    if (this.pageNumPending !== null) {
                        this.renderPage(this.pageNumPending)
                        this.pageNumPending = null
                    }
                })
            })

            // this.pdfDoc.getMetadata().then(metadata => {
            //     this.numPages = metadata.numPages
            // })
        },
        queueRenderPage(num) {
            if (this.pageRendering) {
                this.pageNumPending = num
            } else {
                this.renderPage(num)
            }
        },
        onPrevPage() {
            if (this.pageNum <= 1) {
                this.$message.error("第一页！");
                return
            }
            this.pageNum--
            this.queueRenderPage(this.pageNum)
            this.currentPage = this.pageNum
        },
        onNextPage() {
            if (this.pageNum >= this.numPages) {
                this.$message.error("最后一页！");
                return
            }
            this.pageNum++
            this.queueRenderPage(this.pageNum)
            this.currentPage = this.pageNum
        }
    },
    async created() {
        //TODO 有空再抽出来做
        const pdfUrl = 'https://file.losey.top/blog/23%E7%A7%8D%E8%AE%BE%E8%AE%A1%E6%A8%A1%E5%BC%8F%E6%95%B4%E7%90%86.pdf'
        const loadingTask = PDFLIB.getDocument(pdfUrl)
         await loadingTask.promise.then((pdf) => {
             this.pdfDoc = pdf
             this.numPages = pdf.numPages
             this.renderPage(this.pageNum)
        })
    }
}

</script>
