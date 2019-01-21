# from django_elasticsearch_dsl import DocType, Index
# from .models import Posts
#
# posts = Index('posts')
#
# @posts.doc_type
# class PostDocument(DocType):
#     class Meta:
#         model = Posts
#
#         fields = [
#             'title',
#             'content',
#             'photo',
#         ]
