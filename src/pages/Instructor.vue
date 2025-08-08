<template>
  <article>
        <div class="main-content">
            <div class="teacher-profile">
                <div class="teacher-image-container">
                    <img src="img/instruction1.png" alt="Professor Zhang" class="teacher-image">
                </div>

                <div class="teacher-details">
                    <h1 class="teacher-name">Professor John Zhang</h1>
                    <div class="teacher-title">Professor | PhD Supervisor</div>
                    <span class="teacher-department">School of Computer Science and Technology</span>

                    <!-- Contact Information -->
                    <div class="teacher-contact">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>j.zhang@university.edu</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>Tech Building, Room 502</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-globe"></i>
                            <a href="#" style="color: #3498db;">Personal Website</a>
                        </div>
                    </div>

                    <!-- Research Tags -->
                    <div class="teacher-tags">
                        <span class="tag">Artificial Intelligence</span>
                        <span class="tag">Machine Learning</span>
                        <span class="tag">Computer Vision</span>
                        <span class="tag">National Distinguished Young Scholar</span>
                        <span class="tag">IEEE Fellow</span>
                    </div>

                    <!-- Research Areas -->
                    <div class="section">
                        <h2 class="section-title">Research Areas</h2>
                        <div class="research-area">
                            <div class="area-title">Computer Vision and Pattern Recognition</div>
                            <div class="area-desc">
                                Research focuses on fundamental computer vision tasks including image classification,
                                object detection, semantic segmentation, and instance segmentation, with applications in
                                medical image analysis, autonomous driving, and industrial inspection. The team has
                                published over 30 papers in top-tier conferences such as CVPR, ICCV, and ECCV.
                            </div>
                        </div>
                        <div class="research-area">
                            <div class="area-title">Machine Learning Theory and Algorithms</div>
                            <div class="area-desc">
                                Investigating machine learning methodologies including deep learning, reinforcement
                                learning, and transfer learning, with particular emphasis on few-shot learning,
                                self-supervised learning, and model interpretability. The proposed XX algorithm has
                                achieved state-of-the-art performance on multiple benchmark datasets.
                            </div>
                        </div>
                    </div>

                    <!-- Teaching and Research Achievements -->
                    <div class="section">
                        <h2 class="section-title">Achievements</h2>
                        <ul class="achievement-list">
                            <li class="achievement-item">
                                <div class="achievement-year">2023</div>
                                <div class="achievement-content">
                                    <strong>Second Prize of National Natural Science Award</strong> - Theory and Methods
                                    for Adaptive Visual Understanding in Open Environments
                                </div>
                            </li>
                            <li class="achievement-item">
                                <div class="achievement-year">2022</div>
                                <div class="achievement-content">
                                    <strong>IEEE TPAMI Journal Paper</strong> - "Title of the Paper", IEEE Transactions
                                    on Pattern Analysis and Machine Intelligence
                                </div>
                            </li>
                            <li class="achievement-item">
                                <div class="achievement-year">2021</div>
                                <div class="achievement-content">
                                    <strong>CVPR Best Paper Nominee</strong> - "Title of the Conference Paper", IEEE
                                    Conference on Computer Vision and Pattern Recognition
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    name:'InstructorPage'
}
</script>

<style scoped>
    /* 主体内容样式 */
    .main-content {
        max-width: 1200px;
        margin: 50px auto;
        padding: 0 20px;
    }

    .teacher-profile {
        display: flex;
        background-color: #fff;
        box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        margin-bottom: 50px;
    }

    .teacher-image-container {
        width: 40%;
        padding: 30px;
        border-right:2px dashed rgba(0, 0, 0, 0.3);
    }

    .teacher-image {
        width: 100%;
    }

    .teacher-details {
        width: 60%;
        padding: 40px;
    }

    .teacher-name {
        font-size: 32px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 10px;
    }

    .teacher-title {
        font-size: 18px;
        color: #7f8c8d;
        margin-bottom: 20px;
    }

    .teacher-department {
        display: inline-block;
        background-color: #3498db;
        color: white;
        padding: 5px 15px;
        border-radius: 4px;
        font-size: 16px;
        margin-bottom: 25px;
    }

    .teacher-contact {
        margin-bottom: 30px;
    }

    .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
        font-size: 16px;
    }

    .contact-item i {
        width: 24px;
        color: #3498db;
        margin-right: 12px;
        text-align: center;
        font-size: 18px;
    }

    .section {
        margin-bottom: 30px;
    }

    .section-title {
        font-size: 22px;
        font-weight: bold;
        color: #2c3e50;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 2px solid #f0f0f0;
    }

    .research-area {
        margin-bottom: 20px;
    }

    .area-title {
        font-weight: bold;
        margin-bottom: 8px;
        color: #2c3e50;
        font-size: 18px;
    }

    .area-desc {
        color: #555;
        text-align: justify;
        line-height: 1.7;
    }

    .achievement-list {
        list-style-type: none;
    }

    .achievement-item {
        padding: 12px 0;
        border-bottom: 1px dashed #eee;
        display: flex;
    }

    .achievement-item:last-child {
        border-bottom: none;
    }

    .achievement-year {
        width: 80px;
        font-weight: bold;
        color: #3498db;
    }

    .achievement-content {
        flex: 1;
    }

    .teacher-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 25px 0;
    }

    .tag {
        background-color: #e0f7fa;
        color: #00838f;
        padding: 6px 14px;
        border-radius: 15px;
        font-size: 14px;
    }
</style>