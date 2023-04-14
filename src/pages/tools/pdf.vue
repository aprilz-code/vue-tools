<template>
    <div>
        <canvas ref="pdfCanvas"></canvas>
        <div>Page {{currentPage}} of {{numPages}}</div>
        <el-button-group>
            <el-button type="primary" icon="el-icon-arrow-left" @click="onPrevPage">上一页</el-button>
            <el-button type="primary" @click="onNextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
    </div>
</template>

<script>
import * as  pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry'

export default {
    data() {
        return {
            pdfDoc: null,
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            canvas: null,
            ctx: null,
            scale: 1.5,
            numPages: null,
            currentPage: 1,
            winW: null
    }
    },
    mounted() {
        this.canvas = this.$refs.pdfCanvas
        this.ctx = this.canvas.getContext('2d')
        this.winW = document.documentElement.clientWidth;
       // this.renderPage(this.pageNum)
    },
    methods: {
        renderPage(num) {
            this.pageRendering = true
            this.pdfDoc.getPage(num).then(page => {
                const viewport = page.getViewport({ scale: this.scale })
                let scale = (this.winW / viewport.width).toFixed(2)
                let scaledViewport = page.getViewport({ scale:   scale, })
                this.canvas.height = scaledViewport.height + 300
                this.canvas.width = scaledViewport.width

                const renderContext = {
                    canvasContext: this.ctx,
                    viewport: scaledViewport
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
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
        const loadingTask = pdfjsLib.getDocument(pdfUrl)
         await loadingTask.promise.then((pdf) => {
             this.pdfDoc = pdf
             this.numPages = pdf.numPages
             this.renderPage(this.pageNum)
        })
    }
}

</script>